import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

class StepThree extends Component {
    constructor (props){
        super(props);
        this.state = {
            empName:this.props.empName,
            position:this.props.position,
            empLoc:this.props.empLoc,
            hireDate:this.props.hireDate,
            endDate:this.props.endDate,
            empLogo:this.props.empLogo
        }
    }

    componentDidMount () {
        const {empName,position,empLoc,hireDate,endDate,empLogo} = this.props;
        this.props.updateWork(empName,position,empLoc,hireDate,endDate,empLogo)
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        console.log(111,prop,value)
    }

    handlePrevious(){
        const {empName,position,empLoc,hireDate,endDate,empLogo} = this.state;
        this.props.updateWork(empName,position,empLoc,hireDate,endDate,empLogo);
        this.props.history.push('/register/step2')   
    }
    
    handleNext(){
        const {empName,position,empLoc,hireDate,endDate,empLogo} = this.state;
        this.props.updateWork(empName,position,empLoc,hireDate,endDate,empLogo);
        this.props.history.push('/register/step4')   
    }

    render (){
        const {empName,position,empLoc,hireDate,endDate,empLogo} = this.state

        return (
            <div>
                <h1>Work Experience</h1>
                <h3>Employer</h3>
                <input 
                    placeholder="Employer Name" 
                    value={empName} 
                    onChange={(e)=>{this.handleInput('empName',e.target.value)}}
                    />
                <h3>Position</h3>
                <input 
                    placeholder="Position" 
                    value={position} 
                    onChange={(e)=>{this.handleInput('position',e.target.value)}}
                    />
                <h3>empLoc</h3>
                <input 
                    placeholder="empLoc" 
                    value={empLoc} 
                    onChange={(e)=>{this.handleInput('empLoc',e.target.value)}}
                    />

                <h3>Hire Date</h3>
                <input 
                    placeholder="Hire Date" 
                    value={hireDate} 
                    onChange={(e)=>{this.handleInput('hireDate',e.target.value)}}
                    />

                <h3>End Date</h3>
                <input 
                    placeholder="End Date" 
                    value={endDate} 
                    onChange={(e)=>{this.handleInput('endDate',e.target.value)}}
                    />

                <h3>Employer Logo</h3>
                <input 
                    placeholder="Employer Logo" 
                    value={empLogo} 
                    onChange={(e)=>{this.handleInput('empLogo',e.target.value)}}
                    />

                <button>Add Another Work Experience</button>
                <button onClick={()=>{this.handlePrevious()}}>Go back to Education Info</button>
                <button onClick={()=>{this.handleNext()}}>Go to Add Skills/Languages Info</button>
            </div>
        )
    }
}

function mapStateToProps (reduxState){
    const {empName,position,empLoc,hireDate,endDate,empLogo,firstName} = reduxState
    return {
        empName,
        position,
        empLoc,
        hireDate,
        endDate,
        empLogo, 
        firstName
    }
}

export default connect(mapStateToProps,{updateWork})(StepThree)