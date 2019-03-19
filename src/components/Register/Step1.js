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
        // const {firstName,lastName,email,password,imageUrl} = this.props;
        // this.props.updateUser(firstName,lastName,email,password,imageUrl);
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        });
        // console.log(123,prop,value)
    }

        register =async()=>{
        const {firstName,lastName,email,password,imageUrl} = this.state;
        
        try {
            if(email!=='' && firstName!=='' && lastName!=='' && password!==''){
                if(imageUrl===''){
                    await axios.get(`http://hp-api.herokuapp.com/api/characters/`
                    ).then(character =>{
                        const char = character.data[Math.floor(Math.random()*character.data.length)]
                        console.log(5555,char.image, char)
                        this.setState({
                            imageUrl:char.image
                        })
                    })
                }
                console.log(6666,imageUrl)
                const userInfo = {
                    firstName: firstName,
                    lastName: lastName, 
                    email: email,
                    password: password,
                    imageUrl: this.state.imageUrl
                }
                let user = await axios.post('/auth/register', userInfo)
                console.log(user.data);
                this.props.updateUser(user.data);
                this.props.history.push('/register/step2')   
            }   else {
                   return alert('Please complete all the boxes')
               }
            } catch (err) {
                alert('Sorry this email already exists!')
            }
         } 
        
    
    cancel=()=>{
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            imageUrl:''
        });
        this.props.history.push('/')
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
                <div className="cancel-register-button-container">
                    <button className="cancel-button" onClick={this.cancel}>Cancel</button>  
                    <button className="register-button" onClick={()=>{this.register(firstName,lastName,email,password,imageUrl)}}>Register</button>
                </div>
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