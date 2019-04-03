import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/userActions';
import axios from 'axios';
// gotta change some stuff
const body = {display:'flex',flexDirection:'column',height:467,width:'100%',justifyContent:'space-evenly',alignItems:'center',background:'silver'}
const input = {height:40,fontSize:20,width:260,border:'solid black'};
const buttonHolder = {width:'90%',display:'flex',justifyContent:'space-between',marginBottom:10};
const cancel = {width:100,height:40,background:'black',fontSize:30,color:'white'};
const register = {width:140,height:40,background:'black',fontSize:30,color:'white'};

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
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        });
    }

        register =async()=>{
        const {firstName,lastName,email,password,imageUrl} = this.state;
        
        try {
            if(email!=='' && firstName!=='' && lastName!=='' && password!==''){
                console.log('hit inside first try!')
                if(imageUrl===''){
                    console.log('hit inside image!')
                    await axios.get(`https://hp-api.herokuapp.com/api/characters/`
                    ).then(character =>{
                        const char = character.data[Math.floor(Math.random()*character.data.length)]
                        this.setState({
                            imageUrl:char.image
                        })
                    })
                }
                const userInfo = {
                    firstName: firstName,
                    lastName: lastName, 
                    email: email,
                    password: password,
                    imageUrl: this.state.imageUrl
                }
                let user = await axios.post('/auth/register', userInfo)
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
            <div style={body}>
                <h1>Basic Info</h1>
                <input 
                    value={firstName} 
                    placeholder="First Name" 
                    onChange={(e)=>this.handleInput('firstName',e.target.value)}
                    style={input}
                    />
                <input 
                    value={lastName} 
                    placeholder="Last Name" 
                    onChange={(e)=>this.handleInput('lastName',e.target.value)}
                    style={input}
                    />
                <input 
                    value={email}
                    placeholder="Email" 
                    onChange={(e)=>this.handleInput('email',e.target.value)}
                    style={input}
                    />
                <input 
                    value={password} 
                    type="password"
                    placeholder="Password" 
                    onChange={(e)=>this.handleInput('password',e.target.value)}
                    style={input}
                    />
                <input 
                    value={imageUrl} 
                    placeholder="Image URL" 
                    onChange={(e)=>this.handleInput('imageUrl',e.target.value)}
                    style={input}
                    />
                <div style={buttonHolder}>
                    <button style={cancel} onClick={this.cancel}>Cancel</button>  
                    <button style={register} onClick={()=>{this.register(firstName,lastName,email,password,imageUrl)}}>Register</button>
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