import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

class Work extends Component {
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
            work:this.props.work,
            empName:'',
            empLoc:'',
            empLogo:'',
            hireDate:'',
            endDate:'',
            position:''
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
        const {empName,position,empLoc,hireDate,endDate,empLogo,work} = this.state;
        if(empName !=='' || position !== '' || empLoc !== '' || hireDate !== '' || endDate !== '' || empLogo !== ''){
            work.push({empName,position,empLoc,hireDate,endDate,empLogo});        
                let workProfile = await axios.post('/profile/create/education',{empName,position,empLoc,hireDate,endDate,empLogo});
                this.props.updateWork(workProfile.data);
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

    async deleteWorkProfile(job){
        const {id} = job;
        const workProfile = await axios.delete(`/profile/delete/work/${id}`);
        this.props.updateWork(workProfile.data);
        this.setState({
            work:workProfile.data
        })
    }

    render () {
        const {work} = this.props;
        const workProfile = work.map(job =>{
            // console.log(3333,job)
            return (
                <div key={job.id}>
                    <p>{job.emp_loc}</p>
                    <img src={job.emp_logo} alt="company logo"/>
                    <p>{job.emp_name}</p>
                    <p>{job.position}</p>
                    <p>{job.hire_date}</p>
                    <p>{job.end_date}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteWorkProfile(job)}}>Delete</button>
                </div>
            )
        })

        return (
            <div>
                <h1>WORK</h1>
                <p>{workProfile}</p>
                {this.state.inputBox1}
                {this.state.inputBox2}
                {this.state.inputBox3}
                {this.state.inputBox4}
                {this.state.inputBox5}
                {this.state.inputBox6}
                {this.state.addIsClicked?(<button>Save</button>):(<button onClick={()=>this.editAddIsClicked()}>Add Job</button>)}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        work:reduxState.work
    }
}
        
export default connect(mapStateToProps,{updateWork})(Work)