import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/userActions';
import axios from 'axios';

class StepOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            imageUrl:''
        }
    };
    
    componentDidMount(){
        const {firstName,lastName,email,password,imageUrl} = this.props;
        this.props.updateUser(firstName,lastName,email,password,imageUrl);
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        });
        // console.log(123,prop,value)
    }
    
    async register(){
        const {firstName,lastName,email,password,imageUrl} = this.state;
        try {
            let user = await axios.post('/auth/register',{firstName,lastName,email,password,imageUrl})
            // console.log(user.data);
            this.props.updateUser(user.data);
            this.props.history.push('/register/step2')   
        } catch (err) {
            alert('Sorry this email already exists!')
        }
    }
    
    render (){
        const {firstName,lastName,email,password,imageUrl} = this.state;
        return (
            <div className="basic-info-register-container">
                <h1>Basic Info</h1>
                <input 
                    value={firstName} 
                    placeholder="First Name" 
                    onChange={(e)=>this.handleInput('firstName',e.target.value)}
                    />
                <input 
                    value={lastName} 
                    placeholder="Last Name" 
                    onChange={(e)=>this.handleInput('lastName',e.target.value)}
                    />
                <input 
                    value={email}
                    placeholder="Email" 
                    // require 
                    // minLength='2'
                    // maxLength='50'
                    onChange={(e)=>this.handleInput('email',e.target.value)}
                    />
                <input 
                    value={password} 
                    type="password"
                    placeholder="Password" 
                    onChange={(e)=>this.handleInput('password',e.target.value)}
                    />
                <input 
                    value={imageUrl} 
                    placeholder="Image URL" 
                    onChange={(e)=>this.handleInput('imageUrl',e.target.value)}
                    />
                    
                <button onClick={()=>{this.register(firstName,lastName,email,password,imageUrl)}}>Register</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {firstName,lastName,email,password,imageUrl} = reduxState
    return{
        firstName,
        lastName,
        email,
        password,
        imageUrl
    }
}

export default connect(mapStateToProps,{updateUser})(StepOne)