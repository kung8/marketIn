import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSkillAndLang} from '../../ducks/userActions';

class StepFour extends Component {
    constructor(props){
        super(props);
        this.state = {
            skills:this.props.skills,
            skill:'',
            languages:this.props.languages,
            language:''
        }
    }

    componentDidMount(){
        // console.log(444,this.props.firstName);
        const {skills,languages} = this.props;
        this.props.updateSkillAndLang(skills,languages)

        // console.log(6666,skills,languages)
       
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(111,prop,value)
    }

    

    handleAddSkill (){
        const {skills,skill} = this.state;
        skills.push({skill});
        this.setState({
            skill:''
        })
    }

    handleAddLanguage (){
        const {languages,language} = this.state;
        languages.push({language})
        this.setState({
            language:''
        })
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

    render (){
        console.log(4444,this.props)
        // console.log(12,this.state.skills,this.state.languages)
        const {skill,skills,language,languages} = this.state
        let mappedSkills = skills.map(skill=>{
            // console.log(skill)
            return (
                <div key={skill.id}> {skill['skill']} </div>
            )
        });

        let mappedLang = languages.map(lang=>{
            // console.log(lang)
            return (
                <div key={lang.id}> {lang['language']} </div>
            )
        })
        console.log(mappedSkills)
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

                <div>{mappedSkills}</div>

                <h1>Languages</h1>
                <h3>Language</h3>
                <input 
                    placeholder="Language" 
                    value={language} 
                    onChange={(e)=>{this.handleInput('language',e.target.value)}}
                    />

                <button onClick={()=>this.handleAddLanguage(language)}>Add Another Language</button>
                {mappedLang}
                <br/>
                <br/>
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
    // console.log(5555,reduxState.skills,reduxState.languages)
    const {skills,languages,work,education} = reduxState;
    return{
        skills,
        languages,
        work,
        education
    } 
}

export default connect(mapStateToProps,{updateSkillAndLang})(StepFour)