import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProject} from '../../ducks/userActions';
import axios from 'axios';

class StepFive extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects:[],
            project:''
        }
    }


    componentDidMount(){
        // console.log(7777,this.props.skills,this.props)
        // if(this.props.skills){
        //     this.setState({
        //         skill:this.props.skill(this.props.skills.length-1)
        //     })
        // }
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(111,prop,value)
    }
    
    handleAddProject(){
        const {projects,project} = this.state;
        projects.push({project})
        this.props.updateProject(projects)
        this.setState({
            project:''
        })
    }

    handlePrevious=()=>{
        const {project,projects} = this.state;
        
        projects.push({project});
        this.props.updateProject(projects)
        this.props.history.push('/register/step4')   
       }

    async completeProfile(){
        const {projects,project} = this.state;

        if(project !== '' ){
            projects.push({project});
            this.props.updateProject(projects);
        }
        
        const {skills,languages,work,education} = this.props;
        // console.log(education,languages,work,skills)
        await axios.post('/profile/create',{education,work,skills,languages,projects})
        
        this.props.history.push('/profile')
    }

    render (){
        // console.log(5555,this.props)
        const {project,projects} = this.state
        const {education,work,skills,languages,id} = this.props;
        return (
            <div className="projects-info-register-container">
                <h1>Projects</h1>
                <input 
                    placeholder="Project"
                    value={project} 
                    onChange={(e)=>{this.handleInput('project',e.target.value)}}
                    />
                
                <button onClick={()=>this.handleAddProject(project)}>Add Another Project</button>

                <br/>
                <br/>
                <div className="previous-next-button-register-container">
                    <button className="previous-button" onClick={()=>this.handlePrevious(project)}>Previous</button>
                    <button className="complete-button" onClick={()=>this.completeProfile(projects,education,work,skills,languages,id)}>Complete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
//    console.log(reduxState.education)
    return {
        education:reduxState.education,
        skills:reduxState.skills,
        languages:reduxState.languages,
        work:reduxState.work
    }
} 

export default connect(mapStateToProps,{updateProject})(StepFive)