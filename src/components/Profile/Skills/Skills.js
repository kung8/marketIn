import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateSkill} from '../../../ducks/userActions';
import Skill from './Skill';

class Skills extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            skills:this.props.skills,
            skill:'',
            
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

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    editAddIsClicked(){
        this.setState({
            addIsClicked:true,
            inputBox1:<input onChange={(e)=>{this.handleInput('skill',e.target.value)}}/>,
        })
    }

    addToSkills=async()=>{
        const {skills,skill} = this.state;
        if(skill !== ''){
            skills.push({skill});
            let skillsProfile = await axios.post('/profile/create/skill',{skill})
            this.props.updateSkill(skillsProfile.data);
            this.setState({
                addIsClicked:false,
                skills:this.props.skills,
                inputBox1:''
            })
        } else {
            this.setState({
                addIsClicked:false,
                inputBox1:''
            })
        }
    }

    render () {
        // console.log(1234,this.props.skills,this.props.id)
        const {skills}  = this.props;
        const skillsProfile = skills.map(skill =>{
            // console.log(3333,skill)
            return (
                <Skill 
                    key={skill.id}
                    skill={skill} 
                    />
            )
        })

        return (
            <div>
                <h1>Skills</h1>
                {skillsProfile}
                {this.state.inputBox1}
                {this.state.addIsClicked?(<button onClick={()=>{this.addToSkills()}}>Save</button>):(<button onClick={()=>{this.editAddIsClicked()}}>Add Skill</button>)}

                
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