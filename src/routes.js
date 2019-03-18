import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';

export default  (
        <Switch>
            <Route exact path='/' component={Auth}/>
            <Route path='/register' component={Register}/>
            <Route path='/profile/:userId' component={Profile}/>
            <Route path='/services/:userId' component={Services}/>
            <Route path='/contact/:userId' component={Contact}/>
        </Switch>
)