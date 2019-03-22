const path = require('path'); // Usually moved to the start of file
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const userCtrl = require('./userController/userController')
const profileCtrl = require('./profileController/profileController');
const serviceCtrl = require('./serviceController/serviceController');
const contactCtrl = require('./contactController/contactController');

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);

const socket = require('socket.io')

const aws = require('aws-sdk');
const {CONNECTION_STRING,SESSION_SECRET,SERVER_PORT,S3_BUCKET,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY} = process.env;

const app = express();
app.use(express.json());

const pgPool = new pg.Pool({
    connectionString:CONNECTION_STRING
}) 

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
    console.log("db is running!");
  });

const io = socket(app.listen(SERVER_PORT,()=>{console.log(`Go,go,go...${SERVER_PORT}`)}))
  
app.use(session({
    store:new pgSession({
        pool:pgPool
    }),
    secret:SESSION_SECRET,
    resave:true, 
    saveUninitialized:true,
    cookie:{
        maxAge:123456789
    }
}))

//AWS
app.get('/api/signs3', (req, res) => {
    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        // console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
      // console.log(returnData)
      return res.send(returnData);
    });
  });

//Sockets
io.on('connection',function(socket){
  console.log('working!');
  
  //receives a request to start/join a chat
  socket.on('startChat',function(chatRoom){
    console.log(chatRoom);
    socket.join(chatRoom);
  });

  //receives the request to leave the chat
  socket.on('endChat',function(chatRoom){
    console.log(chatRoom)
    socket.leave(chatRoom);
  })

  //receives the message and then re-emits its to the chatRoom
  socket.on('sendMsg',function(data){
    console.log(data)
    // let offset = new Date().getTimezoneOffset();
    function formatDate(date) {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
     
      var day = date.getDate();
      console.log(day)
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
     
      return day + " " + monthNames[monthIndex] + " " + year;
     }
    
    
    
    let ut = -12
    let date = new Date();
    let zone = date.getTime() + (date.getTimezoneOffset()*60000);
    let current = new Date(zone + (ut*3600000));
    console.log(typeof current, current)
    // current = current.substring(0,current.IndexOf('T'))
    // let time = current.substring(12,current.IndexOf('Z'))
    console.log(current)

    let message = {
      message:data.message,
      name:data.name,
      date:current,
      chat:data.chat,
      // time:time
    }

    io.to(data.chat).emit('sendMsg',message)
  })
})




//userController ENDPOINTS
app.post('/auth/register',userCtrl.register);
app.post('/auth/login',userCtrl.login);
app.get('/auth/current',userCtrl.getUser);
app.post('/auth/logout',userCtrl.logout);

//profileController ENDPOINTS
app.get('/profile/get/users',profileCtrl.getUsers);
app.get('/profile/get/user/:userId',profileCtrl.getUser);

app.get('/profile/get/education/:userId',profileCtrl.getEdProfile);
app.get('/profile/get/work/:userId',profileCtrl.getWorkProfile);
app.get('/profile/get/skills/:userId',profileCtrl.getSkillsProfile);
app.get('/profile/get/languages/:userId',profileCtrl.getLangProfile);
app.get('/profile/get/projects/:userId',profileCtrl.getProjProfile);

app.post('/profile/create',profileCtrl.createProfile); //this is only for registration because they can do multiple
app.post('/profile/create/education',profileCtrl.addEdProfile); //this is to add a ed section to profile
app.post('/profile/create/work',profileCtrl.addWorkProfile); //this is to add a work section to profile
app.post('/profile/create/skill',profileCtrl.addSkillsProfile); //this is to add a skill section to profile
app.post('/profile/create/language',profileCtrl.addLangProfile); //this is to add a language section to profile
app.post('/profile/create/project',profileCtrl.addProjProfile); //this is to add a project section to profile

app.put('/profile/edit/user',profileCtrl.editUserProfile);
app.put('/profile/edit/education',profileCtrl.editEdProfile);
app.put('/profile/edit/work',profileCtrl.editWorkProfile);
app.put('/profile/edit/skill',profileCtrl.editSkillsProfile);
app.put('/profile/edit/language',profileCtrl.editLangProfile);
app.put('/profile/edit/project',profileCtrl.editProjProfile);

app.delete('/profile/delete/education/:id',profileCtrl.deleteEdProfile);
app.delete('/profile/delete/work/:id',profileCtrl.deleteWorkProfile);
app.delete('/profile/delete/skill/:id',profileCtrl.deleteSkillsProfile);
app.delete('/profile/delete/language/:id',profileCtrl.deleteLangProfile);
app.delete('/profile/delete/project/:id',profileCtrl.deleteProjProfile);

//serviceController ENDPOINTS
app.get('/services/get/:userId',serviceCtrl.getServices);
app.post('/service/add',serviceCtrl.addService);
app.put('/service/update/:id',serviceCtrl.updateService);
app.delete('/service/delete/:id',serviceCtrl.deleteService);
app.get('/services/getAll',serviceCtrl.getAllServices);

//contactController ENDPOINTS
app.get('/contact/get/:userId',contactCtrl.getContact);
app.post('/contact/add/phone/:id',contactCtrl.addPhone);
app.post('/contact/add/linkedin/:id',contactCtrl.addLinkedIn);
app.put('/contact/update/phone/:id',contactCtrl.updatePhone);
app.put('/contact/update/linkedin/:id',contactCtrl.updateLinkedIn);