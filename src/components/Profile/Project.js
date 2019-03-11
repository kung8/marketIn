import React, {Component} from 'react';
import axios from 'axios';
import {updateProject} from '../../ducks/userActions';
import { connect  } from "react-redux";

class Project extends Component {
    constructor(props){ 
        super(props);
        this.state={
            edit:false,
            editBox:'',
            projects:this.props.projects,
            project:''
        }
    }

    async deleteProjProfile(proj){
        const {id} = proj;
        const projProfile = await axios.delete(`/profile/delete/project/${id}`);
        this.props.updateProject(projProfile.data);
        this.setState({
            projects:projProfile.data
        })
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle=()=>{
        this.setState({
            edit:true,
            editBox:<input onChange={(e)=>this.handleInput('project',e.target.value)}/>
        })
    }

    render (){
        const {proj} = this.props;
        
        return (
            <div key={proj.id}>
                <p>{proj.project}</p>
                {this.state.editBox}
                {this.state.edit?(<button onClick={()=>this.edit(proj)}>Save</button>):<button onClick={()=>{this.handleEditToggle(proj)}}>Edit</button>}
                <button onClick={()=>{this.deleteProjProfile(proj)}}>Delete</button>
            </div>        
        )
    }
}

    function mapStateToProps (reduxState){
        return {
            projects:reduxState.projects
        }
    }
    export default connect(mapStateToProps,{updateProject})(Project)