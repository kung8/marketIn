import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser,updateUser,updateEducation,updateWork,updateSkill,updateLang,updateProject} from '../../ducks/userActions';
import Education from './Education';
import Work from './Work';
import Skills from './Skills';
import Languages from './Languages';
import Projects from './Projects';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.id,
            firstName:this.props.firstName,
            lastName:this.props.lastName,
            email:this.props.email,
            imageUrl:this.props.imageUrl,
            education:this.props.education,
            work: this.props.work,
            skills: this.props.skills,
            languages: this.props.languages,
            projects: this.props.projects,
            addIsClicked: false,
        }
    }


    //check if user is still here (need to render all the information)
    componentDidMount () {
        this.checkUser();
        this.getProfile()
    }

    async checkUser(){
        //do a get call to be able to find their information from the backend and restore it in the reduxState...
        if(!this.props.id){
            let user = await axios.get('/auth/current')
                this.props.updateUser(user.data)
        }
    }

    getProfile(){
        if(this.props.id){
            // console.log('entered into!')
            axios.get('/profile/get').then(profile =>{
                const {workProfile,skillsProfile,langProfile,projProfile} = profile.data;
                this.props.updateWork(workProfile);
                this.props.updateSkill(skillsProfile);
                this.props.updateLang(langProfile);
                this.props.updateProject(projProfile);
            })
        }
    }

    async logout(){
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/');  
    }
    
    //need to create some input boxes for edit but only want those to show if I press edit. 



    async deleteSkillsProfile(skill){
        const {id} = skill;
        const skillsProfile = await axios.delete(`/profile/delete/skill/${id}`);
        this.props.updateSkill(skillsProfile.data);
        this.setState({
            skills:skillsProfile.data,
        })
    }

    async deleteLangProfile(lang){
        const {id} = lang;
        const langProfile = await axios.delete(`/profile/delete/language/${id}`);
        this.props.updateLang(langProfile.data);
        this.setState({
            languages:langProfile.data,
        })
    }

    async deleteProjProfile(proj){
        const {id} = proj;
        const projProfile = await axios.delete(`/profile/delete/project/${id}`);
        this.props.updateProject(projProfile.data);
        this.setState({
            projects:projProfile.data
        })
        console.log(this.state.projects,this.props.projects)
    }

    render(){
        console.log(8989,this.props)
        const {education,work,skills,languages,projects} = this.props;

        //if a user session id == user then you can edit that profile but this is already a way to check session

        

        const skillsProfile = skills.map(skill =>{
            // console.log(3333,skill)
            return (
                <div key={skill.id}>
                    <p>{skill.skill}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteSkillsProfile(skill)}}>Delete</button>
                </div>
            )
        })

        const langProfile = languages.map(lang =>{
            // console.log(3333,lang)
            return (
                <div lang={lang.id}>
                    <p>{lang.language}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteLangProfile(lang)}}>Delete</button>
                </div>
            )
        })

        const projProfile = projects.map(proj =>{
            // console.log(3333,proj)
            return (
                <div key={proj.id}>
                    <p>{proj.project}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteProjProfile(proj)}}>Delete</button>
                </div>
            )
        })


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
                

                <h1>SKILLS</h1>
                <p>{skillsProfile}</p>
                <button>Add Skill</button>

                <h1>LANGUAGES</h1>
                <p>{langProfile}</p>
                <button>Add Language</button>

                <h1>PROJECTS</h1>
                <p>{projProfile}</p>
                <button>Add Project</button>

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
        education:reduxState.education,
        work: reduxState.work,
        skills: reduxState.skills,
        languages: reduxState.languages,
        projects: reduxState.projects
    }
}

export default connect(mapStateToProps,{clearUser,updateUser,updateEducation,updateWork,updateSkill,updateLang,updateProject})(Profile)