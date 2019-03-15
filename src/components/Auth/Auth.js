import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
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

    // componentDidMount(){
    //     window.onhashchange = function () {
    //         window.location.reload()
    //     }
    // }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

     login = async () => {
        try{
            const {email,password} = this.state;
            let user = await axios.post('/auth/login',{email,password})
            console.log(5555,user.data);
            this.props.updateUser(user.data)
            const {id} = user.data
            console.log(id)
            this.props.history.push(`/profile/${id}`)
            } catch (err){
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
                <button className="login-button" onClick={this.login}>Login</button>
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

export default withRouter(connect(mapStateToProps,{updateUser})(Auth))