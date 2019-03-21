import React, {Component} from 'react';
import axios from 'axios';
import {updateWork} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

class Job extends Component {
    constructor(props){ 
        super(props);
        this.state={
            isEditing:false,
            isEditOpened:false,
            empName:'',
            empLoc:'',
            empLogo:'',
            hireDate:'',
            endDate:'',
            position:'',
            work:this.props.work,
            isLoaded:false, 
            picLoaded:false,
            picEdit:false,
        }
    }

    componentDidMount(){
        this._isMount = true;
    }

    async deleteWorkProfile(job){
        const {id} = job;
        const workProfile = await axios.delete(`/profile/delete/work/${id}`);
        this.props.updateWork(workProfile.data);
        this.setState({
            work:workProfile.data
        })
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle=()=>{
        return(
            <div>
                <input value={this.state.empName} className="edit-input-box" placeholder="Employer" onChange={(e)=>this.handleInput('empName',e.target.value)}/>
                <input value={this.state.position} className="edit-input-box" placeholder="Position" onChange={(e)=>this.handleInput('position',e.target.value)}/>
                <input value={this.state.empLoc} className="edit-input-box" placeholder="Location" onChange={(e)=>this.handleInput('empLoc',e.target.value)}/>
                <input value={this.state.hireDate} className="edit-input-box" placeholder="Hire Date" onChange={(e)=>this.handleInput('hireDate',e.target.value)}/>
                <input value={this.state.endDate} className="edit-input-box" placeholder="End Date" onChange={(e)=>this.handleInput('endDate',e.target.value)}/>
                <input value={this.state.empLogo} className="edit-input-box" placeholder="Emp Logo" onChange={(e)=>this.handleInput('empLogo',e.target.value)}/>
            </div>
        )
    }

    async edit(job){
        const {empName,empLoc,position,empLogo,hireDate,endDate} = this.state;
        if(empName !== '' || empLoc !== '' || position !== '' || empLogo !== '' || hireDate !== '' || endDate !=='' ){
            const {id,user_id} = job;
            // console.log(user_id)
            // console.log(333,this.state.skill,id,user_id);
            const workProfile = await axios.put('/profile/edit/work',{empName,empLoc,position,empLogo,hireDate,endDate,id,user_id})
            // console.log(444,workProfile.data[0])
            this.props.updateWork(workProfile.data)
            if(this._isMount){
                this.setState({
                    isEditing:false,
                    isEditOpened:false, 
                    empName:'',
                    empLoc:'',
                    empLogo:'',
                    hireDate:'',
                    endDate:'',
                    position:'',
                }) 
            }
        }   else {
                this.setState({
                    isEditing:false,
                    isEditOpened:false,
                    empName:job.empName,
                    empLoc:job.empLoc,
                    empLogo:job.empLogo,
                    hireDate:job.hireDate,
                    endDate:job.endDate,
                    position:job.position,
                })
            }
    }

    render (){
        const {job} = this.props
        // console.log(this.props.match.params.userId,this.props.id)
        // console.log(job)
        return (
            <div>
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
                                <img className="school-work-logo" src={job.emp_logo} alt="company logo"/>
                            </div>
                            <div className="large-experience-box">
                                <p>{job.emp_name}</p>
                                <p>{job.position}</p>
                                <p>{job.emp_loc}</p>
                                <p>{job.hire_date}</p>
                                <p>{job.end_date}</p>
                            </div>
                        </div>
                    }

                    {this.props.match.params.userId==this.props.id &&
                        <div className="edit-delete-button-container">
                            {this.state.isEditing?
                                <button className="large-section-add-save-edit-button" onClick={()=>this.edit(job)}>Save</button>
                                :
                                <button className="large-section-add-save-edit-button" onClick={()=>this.setState({isEditOpened:true,isEditing:true,empLoc:job.emp_loc,empLogo:job.emp_logo,empName:job.emp_name,position:job.position,hireDate:job.hire_date,endDate:job.end_date})}>Edit</button>
                            }    

                            <button className="large-section-delete-button" onClick={()=>{this.deleteWorkProfile(job)}}>Delete</button>
                        </div>
                    }

                </div>
            </div>

        )
    }
    }

    function mapStateToProps (reduxState){
        return {
            work:reduxState.work,
            id:reduxState.id
        }
    }
    export default withRouter(connect(mapStateToProps,{updateWork}) (Job))