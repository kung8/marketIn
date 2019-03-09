import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser,updateUser,updateEducation,updateWork,updateSkill,updateLang,updateProject} from '../../ducks/userActions';

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
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            inputBox4:'',
            inputBox5:'',
            inputBox6:'',
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:''
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
        if(!this.props.id){
            // console.log('entered into!')
            axios.get('/profile/get').then(profile =>{
                const {edProfile,workProfile,skillsProfile,langProfile,projProfile} = profile.data;
                this.props.updateEducation(edProfile);
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

    async editEdProfile(sch){
        //need to figure out how people will make the actual edits because they need to be able to select the entire values that were mapped over
        // console.log(123)
        // console.log(sch)
        const {sch_name,major,ed_level,grad_date,sch_loc,sch_logo} = sch
        // console.log(this.props.education);
        // console.log(edProfile)

        let editedProfile = await axios.put('/profile/edit',{sch_name,major,ed_level,grad_date,sch_loc,sch_logo})
    }

    async deleteEdProfile(sch){
        const {id} = sch;
        const edProfile = await axios.delete(`/profile/delete/education/${id}`);
        this.props.updateEducation(edProfile.data);
        this.setState({
            education:edProfile.data
        })
    }

    async deleteWorkProfile(job){
        const {id} = job;
        const workProfile = await axios.delete(`/profile/delete/work/${id}`);
        this.props.updateWork(workProfile.data);
        this.setState({
            work:workProfile.data
        })
    }

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

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        console.log(prop,value)
    }

    editAddIsClickedState (){
        this.setState({
            addIsClicked:true,
            inputBox1:<input onChange={(e)=>{this.handleInput('schName',e.target.value)}}/>,
            inputBox2:<input onChange={(e)=>{this.handleInput('major',e.target.value)}}/>,
            inputBox3:<input onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}/>,
            inputBox4:<input onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}/>,
            inputBox5:<input onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}/>,
            inputBox6:<input onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}/>
        })
       
    }

   addToEd(){
       // console.log('input')
        const {schName,major,edLevel,schLoc,gradDate,schLogo,education} = this.state
        education.push({schName,major,edLevel,schLoc,gradDate,schLogo});
        console.log(33333,education)
        this.props.updateEducation(education);
        axios.post('/profile/create/education',{schName,major,edLevel,schLoc,gradDate,schLogo}).then(
            console.log('connected to back')
        )
        this.setState({
            addIsClicked:false,
            education:this.props.education,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            inputBox4:'',
            inputBox5:'',
            inputBox6:''
        })  
        console.log(2222,this.props.education,this.state.education)     
   }




    render(){
        console.log(8989,this.props)
        
        const {education,work,skills,languages,projects} = this.props;
        // console.log(22222,education,work,skills,languages,projects)
        
        const edProfile = education.map(sch => {
            // console.log(3333,sch)
            return (
                <div key={sch.id}>
                    <p>{sch.sch_name}</p>
                    <p>{sch.major}</p>
                    <p>{sch.ed_level}</p>
                    <p>{sch.grad_date}</p>
                    <p>{sch.sch_loc}</p>
                    <img src={sch.sch_logo} alt="sch_logo"/>
                    <button onClick={()=>{this.editEdProfile(sch)}}>Edit</button>
                    <button onClick={()=>{this.deleteEdProfile(sch)}}>Delete</button>
                </div>
            )
        })


        //if a user session id == user then you can edit that profile but this is already a way to check session

        const workProfile = work.map(job =>{
            // console.log(3333,job)
            return (
                <div key={job.id}>
                    <p>{job.emp_loc}</p>
                    <img src={job.emp_logo} alt="company logo"/>
                    <p>{job.emp_name}</p>
                    <p>{job.position}</p>
                    <p>{job.hire_date}</p>
                    <p>{job.end_date}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteWorkProfile(job)}}>Delete</button>
                </div>
            )
        })

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
                
                <h1>SCHOOL</h1>
                <p>{edProfile}</p>
                {this.state.inputBox1}
                {this.state.inputBox2}
                {this.state.inputBox3}
                {this.state.inputBox4}
                {this.state.inputBox5}
                {this.state.inputBox6}
                {this.state.addIsClicked?(<button onClick={()=>this.addToEd()}>Save</button>):
                <button onClick={()=>this.editAddIsClickedState()}>Add School</button>}
                
                <h1>WORK</h1>
                <p>{workProfile}</p>
                <button>Add Job</button>

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