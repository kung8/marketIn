import {Switch, Route } from 'react-router-dom';
import React from 'react';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';

export default function routes () {
    return (
        <Switch>
            <Route exact path='/' component={Auth}/>
            <Route path='/register' component={Register}/>
            <Route path='/profile' component={Profile}/>
        </Switch>
    )
} 