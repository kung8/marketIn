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
        // if(this.props.skills[0]){
        //     let lastIndex = this.props.skills.length - 1;
        //     this.setState({
        //         skill:this.props.skills[lastIndex].skill
        //     })
        // };
        // if(this.props.languages[0]){
        //     let lastIndex = this.props.languages.length - 1;
        //     this.setState({
        //         language:this.props.languages[lastIndex].language
        //     })
        // }
       
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
        if(skill !== '' || language !==''){
            skills.push({skill});
            languages.push({language});
            this.props.updateSkillAndLang(skills,languages);
            this.props.history.push('/register/step3')   
        } else {
            this.props.history.push('/register/step3')
        }
    }

    handleNext(){
        const {skills,skill,languages,language} = this.state;
        if(skill !== '' || language !== ''){
        skills.push({skill});
        languages.push({language});
        this.props.updateSkillAndLang(skills,languages);
        this.props.history.push('/register/step5'); 
        } else {
            this.props.history.push('/register/step5')
        }  
    }

    render (){
        console.log(4444,this.props)
        const {skill,skills,language,languages} = this.state
        
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
                <button onClick={()=>{this.handlePrevious(skill,language)}}>Go back to Work Experience Info</button>
                <button onClick={()=>{this.handleNext(skill,language)}}>Go to Add Projects Info</button>
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

export default connect(mapStateToProps,{updateSkillAndLang})(StepFour)