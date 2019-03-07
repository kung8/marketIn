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
        // console.log(this.props.firstName)
        const {education} = this.props;
        this.props.updateEducation(education)
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(111,prop,value)
    }

    handleAddEducation(){
        const {education,schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        education.push({schName,major,edLevel,schLoc,gradDate,schLogo});
        this.props.updateEducation(education);
        this.setState({
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:''
        });
    }

    handlePrevious(){
        const {education,schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        // if(schName!=="" && major!=="" && schLoc !=="" && gradDate !=="" && schLogo !==""){
            // education.push({schName,major,edLevel,schLoc,gradDate,schLogo});
            this.props.updateEducation(education);
        // }
        // console.log(222,schName,this.props)
        // this.props.history.push('/register/step1')   
    }

    handleNext(){
        const {education,schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        // if(schName!=="" && major!=="" && schLoc !=="" && gradDate !=="" && schLogo !==""){
            education.push({schName,major,edLevel,schLoc,gradDate,schLogo});
            this.props.updateEducation(education);
            this.props.history.push('/register/step3')   
        // } else {
        //     this.props.history.push('/register/step3')   
        // }
        
        // console.log(222,schName,this.props)
        
        
    }

    render (){
        console.log(2222,this.props)
        const {schName,major,edLevel,schLoc,gradDate,schLogo} = this.state
        return (
            <div>
                <h1>Education</h1>
                <h3>School</h3>
                <input 
                    value={schName} 
                    placeholder="School Name" 
                    onChange={(e)=>{this.handleInput('schName',e.target.value)}}
                    />

                <h3>Major</h3>
                <input 
                    value={major} 
                    placeholder="Major" 
                    onChange={(e)=>{this.handleInput('major',e.target.value)}}
                    />
                
                <h3>Education Level</h3>
                <input 
                    value={edLevel} 
                    placeholder="Education Level" 
                    onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}
                    />

                <h3>School Location</h3>
                <input 
                    value={schLoc} 
                    placeholder="School Location" 
                    onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}
                    />

                <h3>Grad Date</h3>
                <input 
                    value={gradDate} 
                    placeholder="Grad Date" 
                    onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}
                    />

                <h3>School Image</h3>
                <input 
                    value={schLogo} 
                    placeholder="School Image" 
                    onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}
                    />

                <button onClick={()=>this.handleAddEducation(schName,major,edLevel,schLoc,gradDate,schLogo)}>Add Another School</button>

                <br/>
                <br/>
                {/* <button onClick={()=>{this.handlePrevious(schName,major,edLevel,schLoc,gradDate,schLogo)}}>Go back to Profile Info</button> */}
                <button onClick={()=>{this.handleNext(schName,major,edLevel,schLoc,gradDate,schLogo)}}>Next</button>
            </div>
        )
    }
}

function mapStateToProps (reduxState){
    const {education,work} = reduxState
    return {
        education,
        work
    }
}

export default connect(mapStateToProps,{updateEducation})(StepTwo)