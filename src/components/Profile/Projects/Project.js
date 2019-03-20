import React, {Component} from 'react';
import axios from 'axios';
import {updateProject} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import {withRouter} from 'react-router-dom';

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
                if(this._isMount){
                    this.props.updateProject(projProfile.data)
                    this.setState({
                        edit:false,
                        editBox:'',
                        project:'',
                        projects:this.props.projects 
                    }) 
                }
            }   else {
                    this.setState({
                        edit:false,
                        editBox:'',
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
        // console.log(this.props)
        return (
            <div className="small-experience-box">
                <div>
                    <p>{proj.project}</p>
                </div>   
                {this.props.match.params.userId==this.props.id?(<div className="input-edit-delete-container">
                    {this.state.editBox}
                    <div>
                        {this.state.edit?(<button className="add-save-edit-button" onClick={()=>this.edit(proj)}>Save</button>):(<button className="add-save-edit-button" onClick={()=>{this.handleEditToggle(proj)}}>Edit</button>)}
                        
                        <button className="small-section-delete-button" onClick={()=>{this.deleteProjProfile(proj)}}>Delete</button>
                    </div>
                </div>):null}    
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