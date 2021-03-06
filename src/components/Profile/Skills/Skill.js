import React, {Component} from 'react';
import axios from 'axios';
import {updateSkill} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import {withRouter} from 'react-router-dom';

class Skill extends Component {
    constructor(props){
        super(props);
        this.state={
            isEditing:false,
            isEditOpened:false,
            skill:'',
            skills:this.props.skills,
        }
    }

    componentDidMount(){
        this._isMount = true;
    }

    async deleteSkillsProfile(skill){
        const {id} = skill;
        const skillsProfile = await axios.delete(`/profile/delete/skill/${id}`);
        this.props.updateSkill(skillsProfile.data);
        this.setState({
            skills:skillsProfile.data,
        })
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle=()=>{
        return(
            <input value={this.state.skill} className="edit-input-box" onChange={(e)=>this.handleInput('skill',e.target.value)}/>
        )
    }

    async edit(oldSkill){
        const {id,user_id} = oldSkill;
        const {skill} = this.state;
        if(skill !==""){
            const skillsProfile = await axios.put('/profile/edit/skill',{skill,id,user_id})
            if(this._isMount){
                this.props.updateSkill(skillsProfile.data)
                this.setState({
                    isEditing:false,
                    isEditOpened:false,
                    skill:'',
                    skills:this.props.skills
                })
            }
        } else {
            this.setState({
                isEditing:false,
                isEditOpened:false,
                skill:'',
                skills:this.props.skills
            })
        }
        
    }

    render(){
        const {skill} = this.props
        return(
        <div className="small-experience-box">
            {this.state.isEditOpened?
            <div>
                {this.state.isEditing && 
                    this.handleEditToggle()
                }
            </div>
            :
            <div>
                <p>{skill.skill}</p>
            </div>
            }

            {this.props.match.params.userId==this.props.id &&
                <div className="input-edit-delete-container">
                    <div>
                        {this.state.isEditing?
                            <button className="add-save-edit-button" onClick={()=>this.edit(skill)}>Save</button>
                            :
                            <button className="add-save-edit-button" onClick={()=>this.setState({isEditOpened:true,isEditing:true,skill:skill.skill})}>Edit</button>
                        }
                        
                        <button className="small-section-delete-button" onClick={()=>{this.deleteSkillsProfile(skill)}}>Delete</button>
                    </div>
                </div>
            }
        </div>
        )
    }
}

function mapStateToProps (reduxState){
    return{
        skills:reduxState.skills,
        id:reduxState.id
    }
}

export default withRouter(connect(mapStateToProps,{updateSkill})(Skill))