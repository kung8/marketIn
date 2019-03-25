import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

const body = {display:'flex',flexDirection:'column',width:'100%',minHeight:260,alignItems:'center',background:'silver'}
const input = {height:40,fontSize:20,width:260,border:'black solid',marginTop:5};
const add  = {height:30,background:'black',color:'white',marginTop:-10,width:200,fontSize:20,border:'solid black'};

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
        if(empName!=="" || position!=="" || empLoc !=="" || hireDate !=="" || endDate !=="" || empLogo !==""){
            work.push({empName,position,empLoc,hireDate,endDate,empLogo});
            this.props.updateWork(work);
            this.props.history.push('/register/step2') 
        } else {
            this.props.history.push('/register/step2')   
        }
        
    }
    
    handleNext=()=>{
        const {work,empName,position,empLoc,hireDate,endDate,empLogo} = this.state;
        if(empName!=="" || position!=="" || empLoc !=="" || hireDate !=="" || endDate !=="" || empLogo !==""){
            work.push({empName,position,empLoc,hireDate,endDate,empLogo});
            this.props.updateWork(work);
            this.props.history.push('/register/step4')  
        } else {
            this.props.history.push('/register/step4')   
        } 
    }

    render (){
        // console.log(3333,this.props,this.state)
        const {empName,position,empLoc,hireDate,endDate,empLogo} = this.state

        return (
            <div style={body}>
                <h1>Work Experience</h1>
                <input 
                    placeholder="Employer Name" 
                    value={empName} 
                    onChange={(e)=>{this.handleInput('empName',e.target.value)}}
                    style={input}
                    />
                <input 
                    placeholder="Position" 
                    value={position} 
                    onChange={(e)=>{this.handleInput('position',e.target.value)}}
                    style={input}
                    />
                <input 
                    placeholder="Location" 
                    value={empLoc} 
                    onChange={(e)=>{this.handleInput('empLoc',e.target.value)}}
                    style={input}
                    />

                <input 
                    placeholder="Hire Date" 
                    value={hireDate} 
                    onChange={(e)=>{this.handleInput('hireDate',e.target.value)}}
                    style={input}
                    />

                <input 
                    placeholder="End Date" 
                    value={endDate} 
                    onChange={(e)=>{this.handleInput('endDate',e.target.value)}}
                    style={input}
                    />

                <input 
                    placeholder="Employer Logo" 
                    value={empLogo} 
                    onChange={(e)=>{this.handleInput('empLogo',e.target.value)}}
                    style={input}
                    />
                <br/>
                <br/>

                <button onClick={this.handleAddWork} style={add}>Add Another Job</button>
                <br/>
                <br/>
                <div className="previous-next-button-register-container">
                    <button className="previous-button" onClick={this.handlePrevious}>Previous</button>
                    <button className="next-button" onClick={this.handleNext}>Next</button>
                </div>
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