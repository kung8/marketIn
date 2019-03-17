import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Services from './components/Services/Services'
export default  (
        <Switch>
            <Route exact path='/MarketIn/' component={Auth}/>
            <Route path='/MarketIn/register' component={Register}/>
            <Route path='/MarketIn/profile/:userId' component={Profile}/>
            <Route path='/MarketIn/services/:userId' component={Services}/>
        </Switch>
)