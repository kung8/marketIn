import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSkillAndLang} from '../../ducks/userActions';

class StepFour extends Component {
    constructor(props){
        super(props);
        this.state = {
            skills:[],
            skill:'',
            languages:[],
            language:''
        }
    }

    componentDidMount(){
        console.log(444,this.props.firstName);
        const {skills,languages} = this.props;
        console.log(6666,skills,languages)
        // const {skill} = this.props.skills;
        // const {language}=this.props.languages;
        // const {skill,language}=this.props;
        // this.props.updateSkillAndLang(skill,language);
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        console.log(111,prop,value)
    }

    handlePrevious(){
        const {skills,languages} = this.state;
        this.props.updateSkillAndLang(skills,languages);
        this.props.history.push('/register/step3')   
    }

    handleNext(){
        const {skills,languages} = this.state;
        this.props.updateSkillAndLang(skills,languages);

        this.props.history.push('/register/step5')   
    }

    handleAddSkill (){
        let {skills,skill} = this.state;
        let newSkills = skills.slice();
        newSkills.push({skill})
        this.setState({
            skills: newSkills,
            skill:''
        })
        //add an input box
        // console.log('hit')
        // return (
        //     <div>
        //         <input />
        //     </div>
        // )
    }

    render (){
        console.log(this.state.skills)
        const {skill,skills,language,languages} = this.state
        // let mappedSkillsArray = skills.map(skill=>{
        //     return (<p>{skill}</p>)
        // })
        return (
            <div>
                <h1>Skills</h1>
                <h3>Skill</h3>
                <input 
                    placeholder="Skill" 
                    value={skill} 
                    onChange={(e)=>{this.handleInput('skill',e.target.value)}}
                    />
                <button onClick={()=>this.handleAddSkill(skill)}>Add Another Skill</button>

                {/* {mappedSkillsArray} */}

                <h1>Languages</h1>
                <h3>Language</h3>
                <input 
                    placeholder="Language" 
                    value={language} 
                    onChange={(e)=>{this.handleInput('language',e.target.value)}}
                    />

                <button>Add Another Language</button>
                <button onClick={()=>{this.handlePrevious(skill,language)}}>Go back to Work Experience Info</button>
                <button onClick={()=>{this.handleNext(skill,language)}}>Go to Add Projects Info</button>
            </div>
        )
    }
}

//mapping and looping in the component,
//get the full array in the reduxState

function mapStateToProps (reduxState){
    // const {skill,language} = reduxState
    console.log(5555,reduxState.skills,reduxState.languages)
    return{
        reduxState
        // skill:reduxState.skills[0].skill, 
        // language:reduxState.languages[0].language
        // firstName:reduxState.firstName
    } 
}

export default connect(mapStateToProps,{updateSkillAndLang})(StepFour)