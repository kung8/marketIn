require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const userCtrl = require('./userController')
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
app.get('/auth/user',userCtrl.getProfile);
app.post('/auth/register',userCtrl.register);
app.post('/auth/login',userCtrl.login);
app.get('/auth/current',userCtrl.getUser);
app.post('/auth/logout',userCtrl.logout);



