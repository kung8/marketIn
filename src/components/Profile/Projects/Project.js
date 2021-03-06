import React, {Component} from 'react';
import axios from 'axios';
import {updateProject} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import {withRouter} from 'react-router-dom';

class Project extends Component {
    constructor(props){ 
        super(props);
        this.state={
            isEditing:false,
            isEditOpened:false,
            project:'',
            projects:this.props.projects
        }
    }
    componentDidMount(){
        this._isMount = true;
    }

    async deleteProjProfile(proj){
        const {id} = proj;
        const projProfile = await axios.delete(`/profile/delete/project/${id}`);
        this.props.updateProject(projProfile.data);
        this.setState({
            projects:projProfile.data,
            project:''
        })
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle=()=>{
        return(
            <input value={this.state.project} className="edit-input-box" onChange={(e)=>this.handleInput('project',e.target.value)}/>
        )        
    }

    async edit(proj){
        const {project} = this.state;
        
        try {
            if(project !=='' ){
                const {id,user_id} = proj;
                const projProfile = await axios.put('/profile/edit/project',{project,id,user_id})
                if(this._isMount){
                    this.props.updateProject(projProfile.data)
                    this.setState({
                        isEditing:false,
                        isEditOpened:false,
                        project:'',
                        projects:this.props.projects 
                    }) 
                }
            }   else {
                    this.setState({
                        isEditing:false,
                        isEditOpened:false,
                        project:'',
                        projects:this.props.projects
                    })
                }
        } catch (err){
            alert(err)
        }
    }

    render (){
        const {proj} = this.props;
        return (
            <div className="small-experience-box">
                {this.state.isEditOpened?
                <div>
                    {this.state.isEditing && 
                        this.handleEditToggle()
                    }
                </div>:

                <div>
                    <p>{proj.project}</p>
                </div>
                }


                {this.props.match.params.userId==this.props.id && 
                    <div className="input-edit-delete-container">
                        <div>
                            {this.state.isEditing?
                                <button className="add-save-edit-button" onClick={()=>this.edit(proj)}>Save</button>
                                :
                                <button className="add-save-edit-button" onClick={()=>this.setState({isEditOpened:true,isEditing:true,project:proj.project})}>Edit</button>
                            }

                            <button className="small-section-delete-button" onClick={()=>{this.deleteProjProfile(proj)}}>Delete</button>
                        </div>
                    </div>
                }    
            </div>        
        )
    }
}

    function mapStateToProps (reduxState){
        return {
            projects:reduxState.projects,
            id:reduxState.id
        }
    }
    export default withRouter(connect(mapStateToProps,{updateProject})(Project))