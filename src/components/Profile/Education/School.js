import React, {Component} from 'react';
import axios from 'axios';
import {updateEducation} from '../../../ducks/userActions'
import { connect  } from "react-redux";
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

class School extends Component {
    constructor(props){ 
        super(props);
        this.state={
            isEditing:false,
            isEditOpened:false,
            schName:'',
            major:'',
            edLevel:'',
            schLoc:'',
            gradDate:'',
            schLogo:'',
            education:this.props.education,
            isLoaded:false, 
            picLoaded:false,
            picEdit:false,
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
        return(
            <div>
                <input value={this.state.schName} className="edit-input-box" placeholder="School" onChange={(e)=>this.handleInput('schName',e.target.value)}/>
                <input value={this.state.major} className="edit-input-box" placeholder="Major" onChange={(e)=>this.handleInput('major',e.target.value)}/>
                <input value={this.state.edLevel} className="edit-input-box" placeholder="Ed Level" onChange={(e)=>this.handleInput('edLevel',e.target.value)}/>
                <input value={this.state.schLoc} className="edit-input-box" placeholder="Location" onChange={(e)=>this.handleInput('schLoc',e.target.value)}/>
                <input value={this.state.gradDate} className="edit-input-box" placeholder="Grad Date" onChange={(e)=>this.handleInput('gradDate',e.target.value)}/>
                <input value={this.state.schLogo} className="edit-input-box" placeholder="School Logo" onChange={(e)=>this.handleInput('schLogo',e.target.value)}/>
            </div>
        )
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
                    isEditing:false,
                    isEditOpened:false, 
                    schName:'',
                    schLoc:'',
                    schLogo:'',
                    gradDate:'',
                    edLevel:'',
                    major:'',
                }) 
            }
        }   else {
                this.setState({
                    isEditing:false,
                    isEditOpened:false,
                    schName:'',
                    schLoc:'',
                    schLogo:'',
                    gradDate:'',
                    edLevel:'',
                    major:'',
                })
            }
    }

    render (){
        const {sch} = this.props;

        return (
            <div >
                <div className="large-experience-box-top">
                    {this.state.isEditOpened?
                        <div>
                            {this.state.isEditing &&
                                this.handleEditToggle()
                            }
                        </div>
                        :
                        <div>
                            <div className="school-work-logo-container">
                                <img className="school-work-logo" src={sch.sch_logo} alt="sch_logo"/>
                            </div>
                            <div className="large-experience-box">
                                <p>{sch.sch_name}</p>
                                <p>{sch.major}</p>
                                <p>{sch.ed_level}</p>
                                <p>{sch.sch_loc}</p>
                                <p>{sch.grad_date}</p>
                            </div>
                        </div>
                    }
                
                <div>
                    {this.state.isEditOpened?
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
                    {this.props.match.params.userId==this.props.id &&
                        <div className="edit-delete-button-container">
                            {this.state.isEditing?
                                (<button type="button" className="large-section-add-save-edit-button" onClick={()=>this.edit(sch)}>Save</button>)
                                :
                                <button type="button" className="large-section-add-save-edit-button" onClick={()=>this.setState({isEditOpened:true,isEditing:true,schName:sch.sch_name,schLogo:sch.sch_logo,schLoc:sch.sch_loc,major:sch.major,gradDate:sch.grad_date,edLevel:sch.ed_level})}>Edit</button>
                            }

                            <button className="large-section-delete-button" onClick={()=>{this.deleteEdProfile(sch)}}>Delete</button>
                        </div>
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