import {Switch, Route } from 'react-router-dom';
import React from 'react';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
// import Logout from './components/Header/Logout';
// import {connect} from 'react-redux';

export default function Routes (){
// function routes (props) {
    return (
        <Switch>
            <Route path='/register' component={Register}/>
            {/* <Route path='/profile'component={Profile}/> */}
            <Route exact path='/' component={Auth}/>
            <Route path={`/profile/:userId`} component={Profile}/>
            {/* <Route path='/logout' render={Profile}/> */}

        </Switch>
    )
} 

// function mapStateToProps(reduxState){
//     return{
//         firstName:reduxState.firstName,
//         lastName:reduxState.lastName
//     }
// }

// export default connect (mapStateToProps)(routes)