import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSkill,updateLang} from '../../ducks/userActions';

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
        const {skills,skill,languages,language} = this.state;
        if(skill !== '' ){
            skills.push({skill});
            this.props.updateSkill(skills);
        }
            
        if(language !== ''){
            languages.push({language});
            this.props.updateLang(languages);
        }
        this.props.history.push('/register/step3')
        
    }

    handleNext(){
        const {skills,skill,languages,language} = this.state;
        if(skill !== '' ){
            skills.push({skill});
            this.props.updateSkill(skills);
        }
            
        if(language !== ''){
            languages.push({language});
            this.props.updateLang(languages);
        }
        this.props.history.push('/register/step5');   
    }

    render (){
        // console.log(4444,this.props)
        const {skill,language} = this.state
        
        return (
            <div className="skills-and-lang-info-register-container">
                <h1>Skills</h1>
                <h3>Skill</h3>
                <input 
                    placeholder="Skill" 
                    value={skill} 
                    onChange={(e)=>{this.handleInput('skill',e.target.value)}}
                    />
                <button onClick={()=>this.handleAddSkill(skill)}>Add Another Skill</button>

                <h1>Languages</h1>
                <h3>Language</h3>
                <input 
                    placeholder="Language" 
                    value={language} 
                    onChange={(e)=>{this.handleInput('language',e.target.value)}}
                    />

                <button onClick={()=>this.handleAddLanguage(language)}>Add Another Language</button>
                {/* {mappedLang} */}
                <br/>
                <br/>
                <div>
                    <button onClick={()=>{this.handlePrevious(skill,language)}}>Previous</button>
                    <button onClick={()=>{this.handleNext(skill,language)}}>Next</button>
                </div>
            </div>
        )
    }
}

//mapping and looping in the component,
//get the full array in the reduxState

function mapStateToProps (reduxState){

    const {skills,languages,work,education,projects} = reduxState;
    return{
        skills,
        languages,
        work,
        education,
        projects
    } 
}

export default connect(mapStateToProps,{updateSkill,updateLang})(StepFour)