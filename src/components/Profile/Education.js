import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateEducation} from '../../ducks/userActions';

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
        inputBox1:<input onChange={(e)=>{this.handleInput('schName',e.target.value)}}/>,
        inputBox2:<input onChange={(e)=>{this.handleInput('major',e.target.value)}}/>,
        inputBox3:<input onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}/>,
        inputBox4:<input onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}/>,
        inputBox5:<input onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}/>,
        inputBox6:<input onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}/>
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

async deleteEdProfile(sch){
    const {id} = sch;
    const edProfile = await axios.delete(`/profile/delete/education/${id}`);
    this.props.updateEducation(edProfile.data);
    this.setState({
        education:edProfile.data
    })
}



    render(){
        console.log(this.props.education,this.props.id)
        const {education} = this.props;
        const edProfile = education.map(sch => {
            return (
                <div key={sch.id}>
                    <p>{sch.sch_name}</p>
                    <p>{sch.major}</p>
                    <p>{sch.ed_level}</p>
                    <p>{sch.grad_date}</p>
                    <p>{sch.sch_loc}</p>
                    <img src={sch.sch_logo} alt="sch_logo"/>
                    <button onClick={()=>{this.editEdProfile(sch)}}>Edit</button>
                    <button onClick={()=>{this.deleteEdProfile(sch)}}>Delete</button>
                </div>
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