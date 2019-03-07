import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProject} from '../../ducks/userActions';
import axios from 'axios';

class StepFive extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects:this.props.projects,
            project:''
        }
    }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(111,prop,value)
    }
    
    handleAddProject(){
        const {project,projects} = this.state;
        projects.push({project})
        this.props.updateProject(projects)
        this.setState({
            project:''
        })
    }

    handlePrevious(){
        const {project,projects} = this.state;
        projects.push({project})
        this.props.updateProject(projects)
        this.props.history.push('/register/step4')   
       }

    async completeProfile(){
        const {projects} = this.state;
        const {skills,languages,work,education} = this.props
        let profile = await axios.post('/auth/createProfile',{education,work,skills,languages,projects})
        
        this.props.updateProject(profile.data);
        this.props.history.push('/profile')
    }

    render (){
        console.log(5555,this.props)
        const {project,projects} = this.state;

        let mappedProjects = projects.map(project =>{
            return(
                <div key={project.id} >{project['project']}</div>
            )
        })

        return (
            <div>
                <h1>Projects</h1>
                <h3>Project</h3>
                <input 
                    placeholder="Project"
                    value={project} 
                    onChange={(e)=>{this.handleInput('project',e.target.value)}}
                    />
                
                <button onClick={()=>this.handleAddProject(project)}>Add Another Project</button>

                {mappedProjects}
                <br/>
                <br/>

                <button onClick={()=>{this.handlePrevious(project)}}>Go back to Skills/Languages Info</button>
                <button onClick={()=>{this.completeProfile(project)}}>Complete Profile</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return {
        reduxState
    }
} 

export default connect(mapStateToProps,{updateProject})(StepFive)