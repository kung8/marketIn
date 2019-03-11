import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser,updateUser} from '../../ducks/userActions';
import Education from './Education/Education';
import Work from './Work/Work';
import Skills from './Skills/Skills';
import Languages from './Languages/Languages';
import Projects from './Projects/Projects';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.id,
            firstName:this.props.firstName,
            lastName:this.props.lastName,
            email:this.props.email,
            imageUrl:this.props.imageUrl
        }
    }

    componentDidMount () {
        this.checkUser();
    }

    async checkUser(){
        //do a get call to be able to find their information from the backend and restore it in the reduxState...
        if(!this.props.id){
            let user = await axios.get('/auth/current')
                this.props.updateUser(user.data)
        }
    }

    async logout(){
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/');  
    }
    
    //need to create some input boxes for edit but only want those to show if I press edit. 

    render(){
        console.log(8989,this.props)

        //if a user session id == user then you can edit that profile but this is already a way to check session

        return (
            <div>
                <button onClick={()=>this.logout()}>Logout</button>
                <h1>Hello {this.props.firstName}</h1>
                <h1>first:{this.props.firstName}</h1>
                <h1>last:{this.props.lastName}</h1>
                <h1>email:{this.props.email}</h1>
                <img src={this.props.imageUrl}/>
    
                <Education />
                <Work />
                <Skills/>
                <Languages/>
                <Projects/>

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
    }
}

export default connect(mapStateToProps,{clearUser,updateUser})(Profile)