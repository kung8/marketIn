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
            addDivIsOpened:false
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
            inputBox1:<input className="add-input-box" onChange={(e)=>{this.handleInput('skill',e.target.value)}}/>,
            addDivIsOpened:true
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
                inputBox1:'',
                addDivIsOpened:false
            })
        } else {
            this.setState({
                addIsClicked:false,
                inputBox1:'',
                addDivIsOpened:false
            })
        }
    }

    minimize(){
        this.setState({
            isMinimized:true
        })
    }

    maximize(){
        this.setState({
            isMinimized:false
        })
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
                <div className="section-header-holder">
                    <h1 className="section-header">SKILLS</h1>
                    {/* {this.state.isMinimized?<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.maximize()}>+</button>:<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.minimize()}>-</button>} */}
                </div>
                <p>{skillsProfile}</p>
                {this.state.addDivIsOpened?
                (<div className="add-small-input-box-container">
                    {this.state.inputBox1}
                </div>):(this.state.inputBox1)
                }
                <div className="add-button-container">
                    {this.state.addIsClicked?(<button className="add-save-button" onClick={()=>{this.addToSkills()}}>SAVE</button>):(<button className="add-save-button" onClick={()=>{this.editAddIsClicked()}}>ADD</button>)}
                </div>
                
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