import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateWork} from '../../../ducks/userActions';
import Job from './Job';

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
            position:'',
            addDivIsOpened:false
        }
    }

    componentDidMount(){
        this.getWorkProfile()
    }
    
    async getWorkProfile(){
        if(this.props.id){
            const profile = await axios.get('/profile/get/work')
            const {workProfile} = profile.data;
            this.props.updateWork(workProfile);
            this.setState({
                work:this.props.work
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
            inputBox1:<input className="edit-input-box" placeholder="Employer" onChange={(e)=>{this.handleInput('empName',e.target.value)}}/>,
            inputBox2:<input className="edit-input-box" placeholder="Position" onChange={(e)=>{this.handleInput('position',e.target.value)}}/>,
            inputBox3:<input className="edit-input-box" placeholder="Location" onChange={(e)=>{this.handleInput('empLoc',e.target.value)}}/>,
            inputBox4:<input className="edit-input-box" placeholder="Hire Date" onChange={(e)=>{this.handleInput('hireDate',e.target.value)}}/>,
            inputBox5:<input className="edit-input-box" placeholder="End Date" onChange={(e)=>{this.handleInput('endDate',e.target.value)}}/>,
            inputBox6:<input className="edit-input-box" placeholder="Emp Logo" onChange={(e)=>{this.handleInput('empLogo',e.target.value)}}/>,
            addDivIsOpened:true
        })
    }

    addToWork= async()=>{
        const {empName,position,empLoc,hireDate,endDate,empLogo,work} = this.state;
        if(empName !=='' || position !== '' || empLoc !== '' || hireDate !== '' || endDate !== '' || empLogo !== ''){
            work.push({empName,position,empLoc,hireDate,endDate,empLogo});        
                let workProfile = await axios.post('/profile/create/work',{empName,position,empLoc,hireDate,endDate,empLogo});
                this.props.updateWork(workProfile.data);
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

    

    render () {
        const {work} = this.props;
        const workProfile = work.map(job =>{
            // console.log(3333,job)
            return (
                <Job
                    key={job.id}
                    job={job}
                />
            )
        })

        return (
            <div>
                <div className="section-header-holder">
                    <h1 className="section-header">WORK</h1>
                    {this.state.addIsClicked?(<button className="add-save-button" onClick={()=>{this.addToWork()}}>SAVE</button>):(<button className="add-save-button" onClick={()=>this.editAddIsClicked()}>ADD</button>)}
                </div>
                <p>{workProfile}</p>
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
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        work:reduxState.work,
        id:reduxState.id
    }
}
        
export default connect(mapStateToProps,{updateWork})(Work)