import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProject} from '../../ducks/userActions';

class StepFive extends Component {
    constructor(props){
        super(props);
        this.state = {
            project:this.props.project
        }
    }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(111,prop,value)
    }
    
    handlePrevious(){
        const {project} = this.state;
        this.props.updateProject(project);
        this.props.history.push('/register/step4')   
       }


    registerUser(){
        const {project} = this.state;
        this.props.updateProject(project);
        this.props.history.push('/profile')
    }

    render (){
        console.log(11234,this.props.skills)
        const {project} = this.state;

        return (
            <div>
                <h1>Projects</h1>
                <h3>Project</h3>
                <input 
                    placeholder="Project"
                    value={project} 
                    onChange={(e)=>{this.handleInput('project',e.target.value)}}
                    />
                
                <button>Add Another Project</button>
                <button onClick={()=>{this.handlePrevious(project)}}>Go back to Skills/Languages Info</button>
                <button onClick={()=>{this.registerUser(project)}}>Complete Profile</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {project,skills} = reduxState
    return {
        project,
        skills
    }
} 

export default connect(mapStateToProps,{updateProject})(StepFive)