import React, {Component} from 'react';

class StepTwo extends Component {
    
    handlePrevious(){
        this.props.history.push('/register/step1')   
    }

    handleNext(){
        this.props.history.push('/register/step3')   
    }

    render (){
        return (
            <div>
                <h1>Education</h1>
                <h3>School</h3>
                <input placeholder="School Name"/>
                <h3>Major</h3>
                <input placeholder="Major"/>
                <h3>Education Level</h3>
                <input placeholder="Education Level"/>
                <h3>Location</h3>
                <input placeholder="Location"/>
                <h3>School Image</h3>
                <input placeholder="School Image"/>
                <button>Add Another School</button>
                <button onClick={()=>{this.handlePrevious()}}>Back to Profile Info</button>
                <button onClick={()=>{this.handleNext()}}>Add Work Experience Info</button>
            </div>
        )
    }
}

export default StepTwo