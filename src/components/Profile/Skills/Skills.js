import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateSkill} from '../../../ducks/userActions';
import Skill from './Skill';
import {withRouter} from 'react-router-dom';
import LoadingWrapper from '../../Util/LoadingWrapper';

class Skills extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            skills:'',
            skill:'',
            addDivIsOpened:false,
            isLoaded:false
        }
    }

    componentDidMount(){
        this._isMount = true;
        this.getSkillsProfile()
    }
    
    async getSkillsProfile(){
        // console.log(this.props)
        if(this.props.match.params.userId){
            // console.log('hit')
            const profile = await axios.get('/profile/get/skills/'+this.props.match.params.userId)
            // console.log(123,profile)
            const {skillsProfile} = profile.data;
            this.props.updateSkill(skillsProfile);
            if(this._isMount){
                this.setState({
                    skills:this.props.skills,
                    isLoaded:true
                })
            }
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
                addDivIsOpened:false,
                skill:''
            })
        } else {
            this.setState({
                addIsClicked:false,
                inputBox1:'',
                addDivIsOpened:false,
                skill:''
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
                <LoadingWrapper loaded={this.state.isLoaded}>
                    <div className="small-experience-section-box">
                        <p>{skillsProfile}</p>
                        {this.state.addDivIsOpened?
                        (<div className="add-small-input-box-container">
                            {this.state.inputBox1}
                        </div>):(this.state.inputBox1)
                        }
                    </div>
                </LoadingWrapper>
                        {this.props.match.params.userId==this.props.id?(<div className="add-button-container">
                            {this.state.addIsClicked?(<button className="add-save-edit-button" onClick={()=>{this.addToSkills()}}>Save</button>):(<button className="add-save-edit-button" onClick={()=>{this.editAddIsClicked()}}>Add</button>)}
                        </div>):null}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        skills:reduxState.skills,
        id:reduxState.id,
        userId:reduxState
    }
}
        
export default withRouter(connect(mapStateToProps,{updateSkill})(Skills))