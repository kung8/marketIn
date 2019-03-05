import React, {Component} from 'react';

class StepOne extends Component {
    
    handleNext(){
        this.props.history.push('/register/step2')   
    }
    
    render (){
        return (
            <div>
                <input placeholder="First Name"/>
                <input placeholder="Last Name"/>
                <input placeholder="Email"/>
                <input placeholder="Password"/>
                <input placeholder="Image URL"/>
                <button onClick={()=>{this.handleNext()}}>Add Education Info</button>
            </div>
        )
    }
}

export default StepOne