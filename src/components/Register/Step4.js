import React, {Component} from 'react';

class StepFour extends Component {
    handlePrevious(){
        this.props.history.push('/register/step3')   
    }

    handleNext(){
        this.props.history.push('/register/step5')   
    }

    render (){
        return (
            <div>
                <h1>Skills</h1>
                <h3>Skill</h3>
                <input placeholder="Skill"/>
                <button>Add Another Skill</button>


                <h1>Languages</h1>
                <h3>Language</h3>
                <input placeholder="Language"/>

                <button>Add Another Language</button>
                <button onClick={()=>{this.handlePrevious()}}>Back to Work Experience Info</button>
                <button onClick={()=>{this.handleNext()}}>Add Projects Info</button>
            </div>
        )
    }
}

export default StepFour