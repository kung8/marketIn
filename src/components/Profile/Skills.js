import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateSkill} from '../../ducks/userActions';

class Skills extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            inputBox4:'',
            inputBox5:'',
            inputBox6:'',
            skills:this.props.skills,
        }
    }

    componentDidMount(){
        this.getSkillsProfile()
    }
    
    async getSkillsProfile(){
        if(this.props.id){
            // console.log('hit')
            const profile = await axios.get('/profile/get/skills')
            // console.log(123,profile)
            const {skillsProfile} = profile.data;
            this.props.updateSkill(skillsProfile);
            this.setState({
                skills:this.props.skills
            })
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

    render () {
        // console.log(1234,this.props.skills,this.props.id)
        const {skills}  = this.props;
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

        return (
            <div>
                <h1>Skills</h1>
                <p>{skillsProfile}</p>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        skills:reduxState.skills,
        id:reduxState.id
    }
}
        
export default connect(mapStateToProps,{updateSkill})(Skills)