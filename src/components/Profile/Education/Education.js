import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateEducation} from '../../../ducks/userActions';
import School from './School';
import { withRouter } from 'react-router-dom';
import LoadingWrapper from '../../Loader/LoadingWrapper';

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
        isMinimized:false,
        isLoaded:false
    }
}

componentDidMount(){
    this._isMount = true;
    this.getEdProfile()
    
}

async getEdProfile(){
    if(this.props.match.params.userId){
        const profile = await axios.get('/profile/get/education/' + this.props.match.params.userId)
        const {edProfile} = profile.data;
        this.props.updateEducation(edProfile);
        if(this._isMount){
            this.setState({
                education:this.props.education,
                isLoaded:true
            })
        }
    }
}

handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

editAddIsClicked (){
    return(
        <div className="add-large-input-box-container">
            <input className="edit-input-box" placeholder="School" onChange={(e)=>{this.handleInput('schName',e.target.value)}}/>
            <input className="edit-input-box" placeholder="Major" onChange={(e)=>{this.handleInput('major',e.target.value)}}/>
            <input className="edit-input-box" placeholder="Ed Level" onChange={(e)=>{this.handleInput('edLevel',e.target.value)}}/>
            <input className="edit-input-box" placeholder="Location" onChange={(e)=>{this.handleInput('schLoc',e.target.value)}}/>
            <input className="edit-input-box" placeholder="Grad Date" onChange={(e)=>{this.handleInput('gradDate',e.target.value)}}/>
            <input className="edit-input-box-last" placeholder="School Logo" onChange={(e)=>{this.handleInput('schLogo',e.target.value)}}/>
        </div>
    )
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
                addDivIsOpened:false,
                schName:'',
                major:'',
                edLevel:'',
                schLoc:'',
                gradDate:'',
                schLogo:''
            })  
    } else {
        this.setState({
            addIsClicked:false,
            addDivIsOpened:false,
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:'',
            education:this.props.education,
            isloaded:false
        })
    }
}

    minimize(){
        this.setState({
            isMinimized:true,

        })
    }

    maximize(){
        this.setState({
            isMinimized:false
        })
    }

    render(){
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
                        {/* {this.state.isMinimized?<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.maximize()}>+</button>:<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.minimize()}>-</button>} */}
                    </div>
                    <LoadingWrapper loaded={this.state.isLoaded}>
                        <div className="large-experience-section-box">
                            <p>{edProfile}</p>
                            {this.state.addDivIsOpened && (
                                 <div>
                                    {this.state.addIsClicked && 
                                        this.editAddIsClicked()
                                    }
                                </div>)
                            }
                        </div>
                        {this.props.match.params.userId==this.props.id &&
                        <div className="add-button-container">
                            {this.state.addIsClicked?
                            <button className="add-save-edit-button" onClick={()=>this.addToEd()}>Save</button>
                            :
                            <button className="add-save-edit-button" onClick={()=>this.setState({addIsClicked:true,addDivIsOpened:true})}>Add</button>}
                        </div>}
                    </LoadingWrapper>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        education:reduxState.education,
        id:reduxState.id,
    }
}

export default withRouter(connect(mapStateToProps,{updateEducation})(Education))