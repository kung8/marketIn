require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const userCtrl = require('./userController/userController')
const profileCtrl = require('./profileController/profileController');

const {CONNECTION_STRING,SESSION_SECRET,SERVER_PORT} = process.env;
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);

const app = express();
app.use(express.json());

const pgPool = new pg.Pool({
    connectionString:CONNECTION_STRING
}) 

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
    // console.log("db is running!");
    app.listen(SERVER_PORT,()=>{console.log(`Go,go,go...${SERVER_PORT}`)})
});

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

//userController ENDPOINTS
app.post('/auth/register',userCtrl.register);
app.post('/auth/login',userCtrl.login);
app.get('/auth/current',userCtrl.getUser);
app.post('/auth/logout',userCtrl.logout);

//profileController ENDPOINTS
app.get('/profile/get',profileCtrl.getProfile);

app.post('/profile/create',profileCtrl.createProfile); //this is only for registration because they can do multiple
app.post('/profile/create/education',profileCtrl.addEdProfile); //this is to add ed section to profile
// app.post('/profile/create/work',profileCtrl.addWorkProfile); //this is to add ed section to profile
// app.post('/profile/create/skill',profileCtrl.addSkillsProfile); //this is to add ed section to profile
// app.post('/profile/create/language',profileCtrl.addLangProfile); //this is to add ed section to profile
// app.post('/profile/create/project',profileCtrl.addProjProfile); //this is to add ed section to profile

app.put('/profile/edit',profileCtrl.editProfile);


app.delete('/profile/delete/education/:id',profileCtrl.deleteEdProfile);
app.delete('/profile/delete/work/:id',profileCtrl.deleteWorkProfile);
app.delete('/profile/delete/skill/:id',profileCtrl.deleteSkillsProfile);
app.delete('/profile/delete/language/:id',profileCtrl.deleteLangProfile);
app.delete('/profile/delete/project/:id',profileCtrl.deleteProjProfile);





