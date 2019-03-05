import React, {Component} from 'react';

class StepThree extends Component {
    handlePrevious(){
        this.props.history.push('/register/step2')   
    }
    
    handleNext(){
        this.props.history.push('/register/step4')   
    }

    render (){
        return (
            <div>
                <h1>Work Experience</h1>
                <h3>Employer</h3>
                <input placeholder="Employer Name"/>
                <h3>Position</h3>
                <input placeholder="Position"/>
                <h3>Location</h3>
                <input placeholder="Location"/>
                <h3>Hire Date</h3>
                <input placeholder="Hire Date"/>
                <h3>End Date</h3>
                <input placeholder="End Date"/>
                <h3>Employer Logo</h3>
                <input placeholder="Employer Logo"/>
                <button>Add Another Work Experience</button>
                <button onClick={()=>{this.handlePrevious()}}>Back to Education Info</button>
                <button onClick={()=>{this.handleNext()}}>Add Skills/Languages Info</button>
            </div>
        )
    }
}

export default StepThree