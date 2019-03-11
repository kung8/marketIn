import React, {Component} from 'react';
import axios from 'axios';
import {updateWork} from '../../../ducks/userActions';
import { connect  } from "react-redux";

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
            position:''
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
            editBox1:<input placeholder="Employer Name" onChange={(e)=>this.handleInput('empName',e.target.value)}/>,
            editBox2:<input placeholder="Position" onChange={(e)=>this.handleInput('position',e.target.value)}/>,
            editBox3:<input placeholder="Employer Location" onChange={(e)=>this.handleInput('empLoc',e.target.value)}/>,
            editBox4:<input placeholder="Hire Date" onChange={(e)=>this.handleInput('hireDate',e.target.value)}/>,
            editBox5:<input placeholder="End Date" onChange={(e)=>this.handleInput('endDate',e.target.value)}/>,
            editBox6:<input placeholder="Employer Logo" onChange={(e)=>this.handleInput('empLogo',e.target.value)}/>
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
                position:''
                
            }) 
        }   else {
                this.setState({
                    edit:false,
                    editBox1:'',
                    editBox2:'',
                    editBox3:'',
                    editBox4:'',
                    editBox5:'',
                    editBox6:''
                })
            }
    }

    render (){
        const {job} = this.props
        console.log(job.user_id)
        console.log(job)
        return (
            <div key={job.id}>
                    <p>{job.emp_loc}</p>
                    <p>{job.emp_name}</p>
                    <p>{job.position}</p>
                    <p>{job.hire_date}</p>
                    <p>{job.end_date}</p>
                    <img src={job.emp_logo} alt="company logo"/>
                    {this.state.editBox1}
                    {this.state.editBox2}
                    {this.state.editBox3}
                    {this.state.editBox4}
                    {this.state.editBox5}
                    {this.state.editBox6}
                    <br/>
                    {this.state.edit?(<button onClick={()=>this.edit(job)}>Save</button>):<button onClick={()=>{this.handleEditToggle(job)}}>Edit</button>}                    
                    <button onClick={()=>{this.deleteWorkProfile(job)}}>Delete</button>
                </div>

        )
    }
    }

    function mapStateToProps (reduxState){
        return {
            work:reduxState.work
        }
    }
    export default connect(mapStateToProps,{updateWork}) (Job)