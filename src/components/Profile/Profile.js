import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/userActions';

class Profile extends Component {
    async logout(){
        await axios.post('/auth/logout');
        this.props.history.push('/');  
    }
    
    render(){
        return (
            <div>
                <button onClick={()=>this.logout()}>Logout</button>
            </div>
        )
    }
}


export default connect('',{clearUser})(Profile)