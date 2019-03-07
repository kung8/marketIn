import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateEducation} from '../../ducks/userActions'

class StepTwo extends Component {
    constructor(props){
        super(props);
        this.state={
            schName:this.props.schName,
            major:this.props.major,
            edLevel:this.props.edLevel,
            schLoc:this.props.schLoc,
            gradDate:this.props.gradDate,
            schLogo:this.props.schLogo
        }
    }
    componentDidMount(){
        // console.log(this.props.firstName)
        const {schName,major,edLevel,schLoc,gradDate,schLogo} = this.props;
        this.props.updateEducation(schName,major,edLevel,schLoc,gradDate,schLogo)
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        console.log(111,prop,value)
    }

    handlePrevious(){
        const {schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        // console.log(222,schName,this.props)
        
        this.props.updateEducation(schName,major,edLevel,schLoc,gradDate,schLogo);
        this.props.history.push('/register/step1')   
    }

    handleNext(){
        const {schName,major,edLevel,schLoc,gradDate,schLogo} = this.state;
        // console.log(222,schName,this.props)
        
        this.props.updateEducation(schName,major,edLevel,schLoc,gradDate,schLogo);
        this.props.history.push('/register/step3')   
    }

    render (){
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

                <button>Add Another School</button>
                <button onClick={()=>{this.handlePrevious(schName,major,edLevel,schLoc,gradDate,schLogo)}}>Go back to Profile Info</button>
                <button onClick={()=>{this.handleNext(schName,major,edLevel,schLoc,gradDate,schLogo)}}>Go to Add Work Experience Info</button>
            </div>
        )
    }
}

function mapStateToProps (reduxState){
    const {schName,major,edLevel,schLoc,gradDate,schLogo} = reduxState
    return {
        schName,
        major,
        edLevel,
        schLoc,
        gradDate,
        schLogo
        // firstName:firstName
    }
}

export default connect(mapStateToProps,{updateEducation})(StepTwo)