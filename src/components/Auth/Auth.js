import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Auth extends Component {
    render (){
        return (
            <div>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <Link to='/profile'><button>Login</button></Link>
                <Link to='/register/step1'><button>Register</button></Link>
            </div>
        )
    }
}

export default Auth