import React, {Component} from 'react';
import axios from 'axios';
import {updateWork} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import { withRouter } from 'react-router-dom';

class Job extends Component {
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
            work:this.props.work,
            empName:'',
            empLoc:'',
            empLogo:'',
            hireDate:'',
            endDate:'',
            position:'',
            addDivIsOpened:false
        }
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
        this.setState({
            edit:true,
            editBox1:<input className="edit-input-box" placeholder="Employer" onChange={(e)=>this.handleInput('empName',e.target.value)}/>,
            editBox2:<input className="edit-input-box" placeholder="Position" onChange={(e)=>this.handleInput('position',e.target.value)}/>,
            editBox3:<input className="edit-input-box" placeholder="Location" onChange={(e)=>this.handleInput('empLoc',e.target.value)}/>,
            editBox4:<input className="edit-input-box" placeholder="Hire Date" onChange={(e)=>this.handleInput('hireDate',e.target.value)}/>,
            editBox5:<input className="edit-input-box" placeholder="End Date" onChange={(e)=>this.handleInput('endDate',e.target.value)}/>,
            editBox6:<input className="edit-input-box" placeholder="Emp Logo" onChange={(e)=>this.handleInput('empLogo',e.target.value)}/>,
            addDivIsOpened:true
        })
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
            this.setState({
                edit:false,
                editBox1:'',
                editBox2:'',
                editBox3:'',
                editBox4:'',
                editBox5:'',
                editBox6:'',
                empName:'',
                empLoc:'',
                empLogo:'',
                hireDate:'',
                endDate:'',
                position:'',
                addDivIsOpened:false
                
            }) 
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
        const {job} = this.props
        console.log(this.props.match.params.userId,this.props.id)
        // console.log(job)
        return (
            <div className="large-experience-section-box" key={job.id}>
                <div class="large-experience-box-top">
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
                    {this.props.match.params.userId==this.props.id?
                    (<div className="edit-delete-button-container">
                        {this.state.edit?(<button className="edit-save-button" onClick={()=>this.edit(job)}>Save</button>):<button className="edit-save-button" onClick={()=>{this.handleEditToggle(job)}}>Edit</button>}                    
                        <button className="large-section-delete-button" onClick={()=>{this.deleteWorkProfile(job)}}>Delete</button>
                    </div>):null}
                </div>
                <div>
                {this.state.addDivIsOpened?
                    (<div 
                        className="add-edit-box-container">
                        {this.state.editBox1}
                        {this.state.editBox2}
                        {this.state.editBox3}
                        {this.state.editBox4}
                        {this.state.editBox5}
                        {this.state.editBox6}
                    </div>
                        ):(
                    <div>{this.state.editBox1}
                        {this.state.editBox2}
                        {this.state.editBox3}
                        {this.state.editBox4}
                        {this.state.editBox5}
                        {this.state.editBox6}
                    </div>
                )}
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