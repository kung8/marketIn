import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import About from './components/Kevin/About';
import Search from './components/Search/Search';
import Chat from './components/Chat/Chat';
import Purchase from './components/Purchase/Purchase';
import Payments from './components/Payments/Payments';

export default  (
        <Switch>
            <Route exact path='/' component={Auth}/>
            <Route path='/register' component={Register}/>
            <Route path='/search' component={Search}/>
            <Route path='/profile/:userId' component={Profile}/>
            <Route path='/services/:userId' component={Services}/>
            <Route path='/contact/:userId' component={Contact}/>
            <Route path='/about' component={About}/>
            <Route path='/purchase/:viewedUserId' component={Purchase}/>
            <Route path='/chat/:viewedUserId' component={Chat}/>
            <Route path='/payments/:id' component={Payments}/>
        </Switch>
)