import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';

export default  (
        <Switch>
            <Route exact path='/' component={Auth}/>
            <Route path='/register' component={Register}/>
            <Route path='/profile/:userId' component={Profile}/>
        </Switch>
)