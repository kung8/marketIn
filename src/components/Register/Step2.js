import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateEducation} from '../../ducks/userActions'

const body = {display:'flex',flexDirection:'column',width:'100%',minHeight:440,justifyContent:'space-evenly',alignItems:'center',background:'silver'};
const input = {height:40,fontSize:20,width:260,border:'black solid',marginTop:5};
const add  = {height:30,background:'black',color:'white',marginTop:10,width:200,fontSize:20,border:'solid black'};
const buttonHolder = {width:'90%',display:'flex',justifyContent:'flex-end',marginBottom:10};
const next = {width:100,height:40,background:'black',fontSize:30,color:'white'};

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
            <div style={body}>
                <h1>Education</h1>
                <input 
                    value={schName} 
                    placeholder='School Name'
                    onChange={(e)=>{this.handleInput('schName',e.target.value)}}
                    style={input}
                    />

                <input 
                    value={major} 
                    placeholder="Major" 
                    onChange={(e)=>{this.handleInput('major',e.target.value)}}
                    style={input}
                    />
                
                <input 
                    value={edLevel} 
                    placeholder="Education Level" 
                    onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}
                    style={input}
                    />

                <input 
                    value={schLoc} 
                    placeholder="School Location" 
                    onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}
                    style={input}
                    />

                <input 
                    value={gradDate} 
                    placeholder="Grad Date" 
                    onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}
                    style={input}
                    />

                <input 
                    value={schLogo} 
                    placeholder="School Image" 
                    onChange={(e)=>{this.handleInput('schLogo',e.target.value)}} 
                    style={input}
                    />

                <button onClick={()=>this.handleAddEducation(schName,major,edLevel,schLoc,gradDate,schLogo)}  style={add}>Add Another School</button>

                <br/>
                <br/>
                <div style={buttonHolder}>
                    <button onClick={()=>{this.handleNext(schName,major,edLevel,schLoc,gradDate,schLogo)}} style={next}>Next</button>
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