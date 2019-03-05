import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {
    render(){
        return (
            <div>
                <Link to='/'><button>Logout</button></Link>
            </div>
        )
    }
}


export default Profile