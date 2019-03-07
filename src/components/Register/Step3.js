import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

class StepThree extends Component {
    constructor (props){
        super(props);
        this.state = {
            work:this.props.work,
            empName:'',
            position:'',
            empLoc:'',
            hireDate:'',
            endDate:'',
            empLogo:''
        }
    }

    componentDidMount () {
        const {work} = this.props;
        this.props.updateWork(work)
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(111,prop,value)
    }

    handleAddWork=()=>{
        const {work,empName,position,empLoc,hireDate,endDate,empLogo} = this.state;
        work.push({empName,position,empLoc,hireDate,endDate,empLogo});
        this.props.updateWork(work);
        this.setState({
            empName:'',
            position:'',
            empLoc:'',
            hireDate:'',
            endDate:'',
            empLogo:''
        })
    }

    handlePrevious=()=>{
        const {work,empName,position,empLoc,hireDate,endDate,empLogo} = this.state;
        work.push({empName,position,empLoc,hireDate,endDate,empLogo});
        this.props.updateWork(work);
        // this.handleAddWork(empName,position,empLoc,hireDate,endDate,empLogo);
        this.props.history.push('/register/step2')   
    }
    
    handleNext=()=>{
        const {work,empName,position,empLoc,hireDate,endDate,empLogo} = this.state;
        work.push({empName,position,empLoc,hireDate,endDate,empLogo});
        this.props.updateWork(work);
        // this.handleAddWork(empName,position,empLoc,hireDate,endDate,empLogo);
        this.props.history.push('/register/step4')   
    }

    render (){
        console.log(3333,this.props,this.state)
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
                <br/>
                <br/>

                <button onClick={this.handleAddWork}>Add Another Work Experience</button>
                <br/>
                <br/>
                <button onClick={this.handlePrevious}>Previous</button>
                <button onClick={this.handleNext}>Next</button>
            </div>
        )
    }
}

function mapStateToProps (reduxState){
    const {work,education,language,skills} = reduxState
    return {
        work,
        education,
        skills,
        language
    }
}

export default connect(mapStateToProps,{updateWork})(StepThree)