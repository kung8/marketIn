import React, {Component} from 'react';
import axios from 'axios';
import {updateProject} from '../../../ducks/userActions';
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
            editBox:<input className="edit-input-box" onChange={(e)=>this.handleInput('project',e.target.value)}/>
        })
    }

    async edit(proj){
        const {project} = this.state;
        try {
            if(project !=='' ){
                const {id,user_id} = proj;
                // console.log(user_id)
                const projProfile = await axios.put('/profile/edit/project',{project,id,user_id})
                // console.log(444,workProfile.data[0])
                this.props.updateProject(projProfile.data)
                this.setState({
                    edit:false,
                    editBox:'',
                    skill:''
                    
                }) 
            }   else {
                    this.setState({
                        edit:false,
                        editBox:'',
                        skill:''
                    })
                }
        } catch (err){
            alert(err)
        }
    }

    render (){
        const {proj} = this.props;
        
        return (
            <div className="small-experience-section-box" key={proj.id}>
                <div className="small-experience-box">
                    <p>{proj.project}</p>
                </div>    
                <div className="input-edit-delete-container">
                    {this.state.editBox}
                    {this.state.edit?(<button className="edit-save-button" onClick={()=>this.edit(proj)}>Save</button>):<button className="edit-save-button" onClick={()=>{this.handleEditToggle(proj)}}>Edit</button>}
                    <button className="small-section-delete-button" onClick={()=>{this.deleteProjProfile(proj)}}>Delete</button>
                </div>    
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