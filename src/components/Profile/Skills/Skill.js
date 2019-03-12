import React, {Component} from 'react';
import axios from 'axios';
import {updateSkill} from '../../../ducks/userActions';
import { connect  } from "react-redux";

class Skill extends Component {
    constructor(props){
        super(props);
        this.state={
            edit:false,
            editBox:'',
            skills:this.props.skills,
            skill:''
        }
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
        console.log(555,prop,value)
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle=()=>{
        this.setState({
            edit:true,
            editBox:<input className="edit-input-box" onChange={(e)=>this.handleInput('skill',e.target.value)}/>
        })
    }

    

    async edit(oldSkill){
        const {id,user_id} = oldSkill;
        // console.log(333,this.state.skill,id,user_id);
        const {skill} = this.state;
        if(skill !==""){
            const skillsProfile = await axios.put('/profile/edit/skill',{skill,id,user_id})
            // console.log(444,skillsProfile.data[0].skill)
            this.props.updateSkill(skillsProfile.data)
            this.setState({
                edit:false,
                editBox:'',
                skill:''
            })
        } else {
            this.setState({
                edit:false,
                editBox:'',
                skill:''
            })
        }
        
    }

    render(){
        const {skill} = this.props
        return(
        <div className="small-experience-section-box">
            <div className="small-experience-box">
                <p>{skill.skill}</p>
            </div>
            <div className="input-edit-delete-container">
                {this.state.editBox}
                {this.state.edit?(<button className="edit-save-button" onClick={()=>this.edit(skill)}>Save</button>):<button className="edit-save-button" onClick={()=>{this.handleEditToggle(skill)}}>Edit</button>}
                <button className="small-section-delete-button" onClick={()=>{this.deleteSkillsProfile(skill)}}>Delete</button>
            </div>
        </div>
        )
    }
}

function mapStateToProps (reduxState){
    return{
        skills:reduxState.skills
    }
}

export default connect(mapStateToProps,{updateSkill})(Skill)