import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser,updateUser,updateEducation,updateWork,updateSkillAndLang,updateProject} from '../../ducks/userActions';

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
            projects: this.props.projects
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

    async getProfile(){
        if(!this.props.id){
            console.log('entered into!')
            let profile = await axios.get('/profile/get')
            const {edProfile,workProfile,skillsProfile,langProfile,projProfile} = profile.data;
            this.props.updateEducation(edProfile);
            this.props.updateWork(workProfile);
            this.props.updateSkillAndLang(skillsProfile,langProfile);
            this.props.updateProject(projProfile);
        }
    }

    async logout(){
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/');  
    }
    

    async editProfile(){
        //need to figure out how people will make the actual edits because they need to be able to select the entire values that were mapped over
        let editedProfile = await axios.put('/profile/edit',{})


    }

    async deleteProfile(){
        //need to figure out how people will delete the entire/maybe specific values mapped over
        let removedProfile = axios.delete('/profile/delete',{})
    }


    render(){
        console.log(8989,this.props)
        
        const {education,work,skills,languages,projects} = this.props;
        // console.log(22222,education,work,skills,languages,projects)
        
        let edProfile = education.map(sch => {
            // console.log(3333,sch)
            return (
                <div key={sch.id}>
                    <h1>{sch.sch_name}</h1>
                    <h1>{sch.major}</h1>
                    <h1>{sch.ed_level}</h1>
                    <h1>{sch.grad_date}</h1>
                    <h1>{sch.sch_loc}</h1>
                    <h1>{sch.sch_logo}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })

        let workProfile = work.map(job =>{
            // console.log(3333,job)
            return (
                <div>
                    <h1>{job.emp_loc}</h1>
                    <h1>{job.emp_logo}</h1>
                    <h1>{job.emp_name}</h1>
                    <h1>{job.position}</h1>
                    <h1>{job.hire_date}</h1>
                    <h1>{job.end_date}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })

        let skillsProfile = skills.map(skill =>{
            // console.log(3333,skill)
            return (
                <div>
                    <h1>{skill.skill}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })

        let langProfile = languages.map(lang =>{
            // console.log(3333,lang)
            return (
                <div>
                    <h1>{lang.language}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })

        let projProfile = projects.map(proj =>{
            // console.log(3333,proj)
            return (
                <div>
                    <h1>{proj.project}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })


        return (
            <div>
                <button onClick={()=>this.logout()}>Logout</button>
                <h1>Hello</h1>
                <h1>{this.props.firstName}</h1>
                <h1>{this.props.lastName}</h1>
                <h1>{this.props.email}</h1>
                <h1>{this.props.imageUrl}</h1>
                <h1>{edProfile}</h1>
                <h1>{workProfile}</h1>
                <h1>{skillsProfile}</h1>
                <h1>{langProfile}</h1>
                <h1>{projProfile}</h1>

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

export default connect(mapStateToProps,{clearUser,updateUser,updateEducation,updateWork,updateSkillAndLang,updateProject})(Profile)