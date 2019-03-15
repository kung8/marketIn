import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser,updateUser,updateViewedUser} from '../../ducks/userActions';
import Education from './Education/Education';
import Work from './Work/Work';
import Skills from './Skills/Skills';
import Languages from './Languages/Languages';
import Projects from './Projects/Projects';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            firstName:'',
            lastName:'',
            email:'',
            imageUrl:'',
            isLoaded:false,
            isEditing:false,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            inputBox4:'',
        }
    }

    componentDidMount () {
        this._isMount=true;
        this.getUser();
        this.checkUser();
    }

    async checkUser(){
        //do a get call to be able to find their information from the backend and restore it in the reduxState...
        if(!this.props.id){
            let user = await axios.get('/auth/current')
                this.props.updateUser(user.data)
        }
    }

    async getUser(){
        // console.log('hit!',this.props.match.params.userId)
        const userProfile = await axios.get('/profile/get/user/'+this.props.match.params.userId);
        // console.log(7777,userProfile.data);
        this.props.updateViewedUser(userProfile.data[0])

    }

    logout=async()=>{
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/');  
    }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        console.log(prop,value)
    }

    createEditBoxes(){
        this.setState({
            isEditing:true,
            inputBox1:<input placeholder="First Name" onChange={(e)=>this.handleInput('firstName',e.target.value)}/>,
            inputBox2:<input placeholder="Last Name" onChange={(e)=>this.handleInput('lastName',e.target.value)}/>,
            inputBox3:<input placeholder="Email" onChange={(e)=>this.handleInput('email',e.target.value)}/>,
            inputBox4:<input placeholder="Profile Pic" onChange={(e)=>this.handleInput('imageUrl',e.target.value)}/>,
        })
    }

    async editProfile(){
        const {firstName,lastName,email,imageUrl} = this.state;
        const {id} = this.props;
        if(firstName!=='' && lastName!=='' && email!=='' && imageUrl !==''){
            console.log(id,firstName,lastName,email,imageUrl)
            //need to create a call to edit the user's email, first and last name, and picture
            let userProfile = await axios.put('/profile/edit/user',{firstName,lastName,email,imageUrl,id});
            console.log(userProfile)
            this.props.updateUser(userProfile.data)
            this.setState({
                isEditing:false,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                inputBox4:'',
                firstName:this.props.firstName,
                lastName:this.props.lastName,
                email:this.props.email,
                imageUrl:this.props.imageUrl

            })
        }
            this.setState({
                isEditing:false,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                inputBox4:''
            })
        }

    //need to create some input boxes for edit but only want those to show if I press edit. 

    render(){
        // console.log(8989,this.props)
        console.log(this.props)

        //if a user session id == user then you can edit that profile but this is already a way to check session

        return (
            <div className="profile-container">
                {this.state.isLoaded?(<div className="loader"></div>):null}
                <div className="profile-basic-info-container">
                    <img className="profile-picture" src={this.props.userImageUrl} alt="Profile Pic"/>
                    <div>
                        <h1>{this.props.userFirstName} {this.props.userLastName}</h1>
                        <h1>{this.props.userEmail}</h1>
                    </div>
                    {this.state.inputBox1}
                    {this.state.inputBox2}
                    {this.state.inputBox3}
                    {this.state.inputBox4}
                    {/* {this.props.match.params.userId != this.props.id?(null):(<div>Same</div>)?(<button onClick={()=>this.editProfile()}>Edit</button>):(<div>No</div>)} */}
                    {/* {this.props.match.params.userId == this.props.id? */}
                        {this.state.isEditing?(<button onClick={()=>this.editProfile()}>Save</button>):(<button onClick={()=>this.createEditBoxes()}>Edit</button>)}
                        {/* :(null)} */}
                </div>    
                <div className="section-container">
                    <Education /> 
                </div>
                <div className="section-container">
                    <Work />
                </div>
                <div className="section-container">
                    <Skills/>
                </div>
                <div className="section-container">
                    <Languages/>
                </div>
                <div className="section-container">
                    <Projects/>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps (reduxState){
    return {
        id:reduxState.id,
        firstName:reduxState.firstName,
        lastName:reduxState.lastName,
         email:reduxState.email,
        imageUrl:reduxState.imageUrl,
        userFirstName:reduxState.userFirstName,
        userLastName:reduxState.userLastName,
        userEmail:reduxState.userEmail,
        userImageUrl:reduxState.userImageUrl,
        viewedUserId:reduxState.viewedUserId,
        education:reduxState.education
    }
}

export default connect(mapStateToProps,{clearUser,updateUser,updateViewedUser})(Profile)