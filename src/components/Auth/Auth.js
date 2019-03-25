import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/userActions';
import axios from 'axios';

const body = {marginTop:80,height:464,width:320,display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',flexWrap:'wrap',background:'silver',fontSize:30}
const input = {marginTop:40,minHeight:50,width:250,fontSize:35,border:'solid black'}
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
            // console.log(5555,user.data);
            this.props.updateUser(user.data)
            const {id} = user.data
            // console.log(id)
            this.props.history.push(`/profile/${id}`)
            } catch (err){
                alert(err)
                // alert("Please enter a valid combination.")
        }    
    }

    render (){
        // console.log(1111,this.props)
        return (
            <div style={body}>
                <input style={input} type="text" placeholder="Email" onChange={(e)=>this.handleInput('email',e.target.value)}/>
                <input style={input} type="password" placeholder="Password" onChange={(e)=>this.handleInput('password',e.target.value)}/>
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