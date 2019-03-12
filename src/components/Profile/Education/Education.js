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
        schLogo:'',
        addDivIsOpened:false,
        isMinimized:false
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
        inputBox1:<input className="edit-input-box" placeholder="School" onChange={(e)=>{this.handleInput('schName',e.target.value)}}/>,
        inputBox2:<input className="edit-input-box" placeholder="Major" onChange={(e)=>{this.handleInput('major',e.target.value)}}/>,
        inputBox3:<input className="edit-input-box" placeholder="Ed Level" onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}/>,
        inputBox4:<input className="edit-input-box" placeholder="Location" onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}/>,
        inputBox5:<input className="edit-input-box" placeholder="Grad Date" onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}/>,
        inputBox6:<input className="edit-input-box" placeholder="School Logo" onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}/>,
        addDivIsOpened:true
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
                inputBox6:'',
                addDivIsOpened:false
            })  
    } else {
        this.setState({
            addIsClicked:false,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            inputBox4:'',
            inputBox5:'',
            inputBox6:'',
            addDivIsOpened:false
        })
    }
}


    minimize(){
        this.setState({
            isMinimized:true
        })
    }

    maximize(){
        this.setState({
            isMinimized:false
        })
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
                
                <div className="section-header-holder">
                    <h1 className="section-header">EDUCATION</h1>
                    {this.state.isMinimized?<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.maximize()}>+</button>:<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.minimize()}>-</button>}
                </div>
                <p>{edProfile}</p>
                {this.state.addDivIsOpened?(
                    <div className="add-large-input-box-container">
                        {this.state.inputBox1}
                        {this.state.inputBox2}
                        {this.state.inputBox3}
                        {this.state.inputBox4}
                        {this.state.inputBox5}
                        {this.state.inputBox6}
                    </div>) : 
                    (<div>
                        {this.state.inputBox1}
                        {this.state.inputBox2}
                        {this.state.inputBox3}
                        {this.state.inputBox4}
                        {this.state.inputBox5}
                        {this.state.inputBox6}
                    </div>)
                }
                <div className="add-button-container">
                    {this.state.addIsClicked?(<button className="add-save-button" onClick={()=>this.addToEd()}>SAVE</button>):
                    (<button className="add-save-button" onClick={()=>this.editAddIsClicked()}>ADD</button>)}
                </div>
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