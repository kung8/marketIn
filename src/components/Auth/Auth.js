import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/userActions';
import axios from 'axios';

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

    async login(){
        try{
            const {email,password} = this.state;
            let user = await axios.post('/auth/login',{email,password})
            // console.log(user.data);
            this.props.updateUser(user.data)
            const {id} = user.data
            const {history} = this.props;
            await history.push(`/profile/${id}`)
            // console.log(this.props.history)
        } 
        catch (err){
            alert(err)
            // alert("Please enter a valid combination.")
        }    
    }

    render (){
        console.log(1111,this.props)
        return (
            <div className="login-page">
                <input className="login-input" type="text" placeholder="Email" onChange={(e)=>this.handleInput('email',e.target.value)}/>
                <input className="login-input" type="password" placeholder="Password" onChange={(e)=>this.handleInput('password',e.target.value)}/>
                <button className="login-button" onClick={()=>this.login()}>Login</button>
                {/* <Link to='/profile/'><button className="login-button" onClick={this.login}>Login</button></Link> */}
                {/* <Link to={`/profile/${user.data.id}`}><button className="login-button" onClick={this.login}>Login</button></Link> */}
                <Link to='/register/step1'>Create an Account</Link>
            </div> 
        )
    }
}

function mapStateToProps(reduxState){
    return{
        reduxState
    }
}

export default connect(mapStateToProps,{updateUser})(Auth)