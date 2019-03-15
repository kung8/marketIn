import React, {Component} from 'react';
import axios from 'axios';
import {updateEducation} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import { withRouter } from 'react-router-dom';

class School extends Component {
    constructor(props){ 
        super(props);
        this.state={
            edit:false,
            editBox1:'',
            editBox2:'',
            editBox3:'',
            editBox4:'',
            editBox5:'',
            editBox6:'',
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
        this._isMount = true;
    }

    async deleteEdProfile(sch){
        const {id} = sch;
        const edProfile = await axios.delete(`/profile/delete/education/${id}`);
        this.props.updateEducation(edProfile.data);
        this.setState({
            education:edProfile.data
        })
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(prop,value)
    }

    handleEditToggle=()=>{
        this.setState({
            edit:true,
            editBox1:<input className="edit-input-box" placeholder="School" onChange={(e)=>this.handleInput('schName',e.target.value)}/>,
            editBox2:<input className="edit-input-box" placeholder="Major" onChange={(e)=>this.handleInput('major',e.target.value)}/>,
            editBox3:<input className="edit-input-box" placeholder="Ed Level" onChange={(e)=>this.handleInput('edLevel',e.target.value)}/>,
            editBox4:<input className="edit-input-box" placeholder="Location" onChange={(e)=>this.handleInput('schLoc',e.target.value)}/>,
            editBox5:<input className="edit-input-box" placeholder="Grad Date" onChange={(e)=>this.handleInput('gradDate',e.target.value)}/>,
            editBox6:<input className="edit-input-box" placeholder="School Logo" onChange={(e)=>this.handleInput('schLogo',e.target.value)}/>,
            addDivIsOpened:true
        })
    }

    async edit(sch){
        const {schName,schLoc,major,schLogo,gradDate,edLevel} = this.state;
        if(schName !== '' || schLoc !== '' || major !== '' || schLogo !== '' || gradDate !== '' || edLevel !=='' ){
            const {id,user_id} = sch;
            // console.log(user_id)
            // console.log(333,this.state.skill,id,user_id);
            const edProfile = await axios.put('/profile/edit/education',{schName,schLoc,major,schLogo,gradDate,edLevel,id,user_id})
            // console.log(444,workProfile.data[0])
            this.props.updateEducation(edProfile.data)
            if(this._isMount){
                this.setState({
                    edit:false,
                    editBox1:'',
                    editBox2:'',
                    editBox3:'',
                    editBox4:'',
                    editBox5:'',
                    editBox6:'',
                    schName:'',
                    schLoc:'',
                    schLogo:'',
                    gradDate:'',
                    edLevel:'',
                    major:'',
                    addDivIsOpened:false 
                }) 
            }
        }   else {
                this.setState({
                    edit:false,
                    editBox1:'',
                    editBox2:'',
                    editBox3:'',
                    editBox4:'',
                    editBox5:'',
                    editBox6:'',
                    addDivIsOpened:false
                })
            }
    }

    render (){
        const {sch} = this.props;

        return (
            <div className="large-experience-section-box" key={sch.id}>
                <div className="large-experience-box-top">
                    <div className="school-work-logo-container">
                        <img className="school-work-logo" src={sch.sch_logo} alt="sch_logo"/>
                    </div>
                    <span className="large-experience-box">
                        <p>{sch.sch_name}</p>
                        <p>{sch.major}</p>
                        <p>{sch.ed_level}</p>
                        <p>{sch.sch_loc}</p>
                        <p>{sch.grad_date}</p>
                    </span>
                    {this.props.match.params.userId==this.props.id?(
                    <div className="edit-delete-button-container">
                        {this.state.edit?(<button type="button" className="edit-save-button" onClick={()=>this.edit(sch)}>Save</button>):<button type="button" className="edit-save-button" onClick={()=>{this.handleEditToggle(sch)}}>Edit</button>}
                        <button className="large-section-delete-button" onClick={()=>{this.deleteEdProfile(sch)}}>Delete</button>
                    </div>):null} 
                </div>
                <div>
                    {this.state.addDivIsOpened?
                    (<div className="add-edit-box-container">
                        {this.state.editBox1}
                        {this.state.editBox2}
                        {this.state.editBox3}
                        {this.state.editBox4}
                        {this.state.editBox5}
                        {this.state.editBox6}
                    </div>):(<div>{this.state.editBox1}
                        {this.state.editBox2}
                        {this.state.editBox3}
                        {this.state.editBox4}
                        {this.state.editBox5}
                        {this.state.editBox6}
                        </div>)
                    }
                </div>   
                </div>

        )
    }
    }
    function mapStateToProps (reduxState){
        return {
            education:reduxState.education,
            id:reduxState.id
        }
    }
    export default withRouter(connect(mapStateToProps,{updateEducation})(School))