import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/userActions';
import axios from 'axios';

const button = {height:40,width:160,fontSize:35,background:'black',color:'white',border:'black'};
const link = {color:'black',textDecoration:'none'};

class Auth extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

     login = async () => {
        try{
            const {email,password} = this.state;
            let user = await axios.post('/auth/login',{email,password})
            this.props.updateUser(user.data)
            const {id} = user.data
            this.props.history.push(`/profile/${id}`)
            } catch (err){
                alert(err)
                // alert("Please enter a valid combination.")
        }    
    }

    render (){
        return (
            <div className='login'>
                <input type="text" placeholder="Email" onChange={(e)=>this.handleInput('email',e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>this.handleInput('password',e.target.value)}/>
                <button style={button} onClick={this.login}>Login</button>
                <Link to='/register/step1' style={link}>Create an Account</Link>
            </div> 
        )
    }
}

function mapStateToProps(reduxState){
    return{
        reduxState
    }
}

export default withRouter(connect(mapStateToProps,{updateUser})(Auth))