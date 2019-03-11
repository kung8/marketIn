import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateEducation} from '../../../ducks/userActions';
import School from './School';

class Education extends Component {
constructor(props){
    super(props);
    this.state={
        addIsClicked: false,
        inputBox1:'',
        inputBox2:'',
        inputBox3:'',
        inputBox4:'',
        inputBox5:'',
        inputBox6:'',
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
    this.getEdProfile()
}

async getEdProfile(){
    if(this.props.id){
        const profile = await axios.get('/profile/get/education')
        const {edProfile} = profile.data;
        this.props.updateEducation(edProfile);
        this.setState({
            education:this.props.education
        })
    }
}

handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

editAddIsClicked (){
    this.setState({
        addIsClicked:true,
        inputBox1:<input placeholder="School Name" onChange={(e)=>{this.handleInput('schName',e.target.value)}}/>,
        inputBox2:<input placeholder="Major" onChange={(e)=>{this.handleInput('major',e.target.value)}}/>,
        inputBox3:<input placeholder="Education Level" onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}/>,
        inputBox4:<input placeholder="School Location" onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}/>,
        inputBox5:<input placeholder="Graduation Date" onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}/>,
        inputBox6:<input placeholder="School Logo" onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}/>
    })
}

addToEd= async()=>{
    const {schName,major,edLevel,schLoc,gradDate,schLogo,education} = this.state;
    if(schName !=='' || major !== '' || edLevel !== '' || schLoc !== '' || gradDate !== '' || schLogo !== ''){
        education.push({schName,major,edLevel,schLoc,gradDate,schLogo});        
            let edProfile = await axios.post('/profile/create/education',{schName,major,edLevel,schLoc,gradDate,schLogo});
            this.props.updateEducation(edProfile.data);
            this.setState({
                addIsClicked:false,
                education:this.props.education,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                inputBox4:'',
                inputBox5:'',
                inputBox6:''
            })  
    } else {
        this.setState({
            addIsClicked:false,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            inputBox4:'',
            inputBox5:'',
            inputBox6:''
        })
    }
}





    render(){
        console.log(this.props.education,this.props.id)
        const {education} = this.props;
        const edProfile = education.map(sch => {
            return (
                <School
                    key={sch.id}
                    sch={sch} 
                />
            )
        })
    
        return (
            <div>
                Education
                <p>{edProfile}</p>
                {this.state.inputBox1}
                {this.state.inputBox2}
                {this.state.inputBox3}
                {this.state.inputBox4}
                {this.state.inputBox5}
                {this.state.inputBox6}
                {this.state.addIsClicked?(<button onClick={()=>this.addToEd()}>Save</button>):
                (<button onClick={()=>this.editAddIsClicked()}>Add School</button>)}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    console.log(reduxState)
    return{
        education:reduxState.education,
        id:reduxState.id
    }
}

export default connect(mapStateToProps,{updateEducation})(Education)