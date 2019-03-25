import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateEducation} from '../../ducks/userActions'

class StepTwo extends Component {
    constructor(props){
        super(props);
        this.state={
            education:this.props.education,
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:''
        }
    }
    componentDidMount(){

    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleAddEducation(){
        const {education,schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        education.push({schName,major,edLevel,schLoc,gradDate,schLogo});
        // this.props.updateEducation(education);
        this.setState({
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:''
        });
    }

    handleNext(){
        const {education,schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        if(schName!=="" || major!=="" || schLoc !=="" || gradDate !=="" || schLogo !==""){
            education.push({schName,major,edLevel,schLoc,gradDate,schLogo});
            this.props.updateEducation(education);
            this.props.history.push('/register/step3')   
        } else {
            this.props.history.push('/register/step3')   
        }        
    }

    render (){
        const {schName,major,edLevel,schLoc,gradDate,schLogo} = this.state
        return (
            <div className="education-info-register-container">
                <h1>Education</h1>
                <input 
                    value={schName} 
                    placeholder='School Name'
                    onChange={(e)=>{this.handleInput('schName',e.target.value)}}
                    />

                <input 
                    value={major} 
                    placeholder="Major" 
                    onChange={(e)=>{this.handleInput('major',e.target.value)}}
                    />
                
                <input 
                    value={edLevel} 
                    placeholder="Education Level" 
                    onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}
                    />

                <input 
                    value={schLoc} 
                    placeholder="School Location" 
                    onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}
                    />

                <input 
                    value={gradDate} 
                    placeholder="Grad Date" 
                    onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}
                    />

                <input 
                    value={schLogo} 
                    placeholder="School Image" 
                    onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}
                    />

                <button onClick={()=>this.handleAddEducation(schName,major,edLevel,schLoc,gradDate,schLogo)}>Add Another School</button>

                <br/>
                <br/>
                <div className="next-button-register-container">
                    <button onClick={()=>{this.handleNext(schName,major,edLevel,schLoc,gradDate,schLogo)}}>Next</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps (reduxState){
    const {education,work,id} = reduxState
    return {
        education,
        work,
        id
    }
}

export default connect(mapStateToProps,{updateEducation})(StepTwo)