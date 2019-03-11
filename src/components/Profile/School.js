import React, {Component} from 'react';
import axios from 'axios';
import {updateEducation} from '../../ducks/userActions';
import { connect  } from "react-redux";

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
        console.log(prop,value)
    }

    handleEditToggle=()=>{
        this.setState({
            edit:true,
            editBox1:<input onChange={(e)=>this.handleInput('schName',e.target.value)}/>,
            editBox2:<input onChange={(e)=>this.handleInput('major',e.target.value)}/>,
            editBox3:<input onChange={(e)=>this.handleInput('edLevel',e.target.value)}/>,
            editBox4:<input onChange={(e)=>this.handleInput('schLoc',e.target.value)}/>,
            editBox5:<input onChange={(e)=>this.handleInput('gradDate',e.target.value)}/>,
            editBox6:<input onChange={(e)=>this.handleInput('schLogo',e.target.value)}/>
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
                major:''
                
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
        const {sch} = this.props;

        return (
            <div key={sch.id}>
                    <p>{sch.sch_name}</p>
                    <p>{sch.major}</p>
                    <p>{sch.ed_level}</p>
                    <p>{sch.grad_date}</p>
                    <p>{sch.sch_loc}</p>
                    <img src={sch.sch_logo} alt="sch_logo"/>
                    {this.state.editBox1}
                    {this.state.editBox2}
                    {this.state.editBox3}
                    {this.state.editBox4}
                    {this.state.editBox5}
                    {this.state.editBox6}
                    {this.state.edit?(<button onClick={()=>this.edit(sch)}>Save</button>):<button onClick={()=>{this.handleEditToggle(sch)}}>Edit</button>}
                    <button onClick={()=>{this.deleteEdProfile(sch)}}>Delete</button>
                </div>

        )
    }
    }
    function mapStateToProps (reduxState){
        return {
            education:reduxState.education
        }
    }
    export default connect(mapStateToProps,{updateEducation})(School)