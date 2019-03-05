require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const userCtrl = require('./userController')
const {CONNECTION_STRING,SESSION_SECRET,SERVER_PORT} = process.env;

const app = express();
app.use(express.json());

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
    // console.log("db is running!");
    app.listen(SERVER_PORT,()=>{console.log(`Go,go,go...${SERVER_PORT}`)})
});

app.use(session({
    secret:SESSION_SECRET,
    resave:true, 
    saveUninitialized:true,
    cookie:{
        maxAge:123456789
    }
}))

//userController ENDPOINTS
app.get('/auth/user',userCtrl.getProfile)




