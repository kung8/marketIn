import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateWork} from '../../../ducks/userActions';
import Job from './Job';
import {withRouter} from 'react-router-dom';
import LoadingWrapper from '../../Loader/LoadingWrapper';

class Work extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            work:this.props.work,
            empName:'',
            empLoc:'',
            empLogo:'',
            hireDate:'',
            endDate:'',
            position:'',
            addDivIsOpened:false,
            isMinimized:false,
            isLoaded:false
        }
    }

    componentDidMount(){
        this._isMount = true;
        this.getWorkProfile()
    }
    
    async getWorkProfile(){
        if(this.props.match.params.userId){
            const profile = await axios.get('/profile/get/work/'+this.props.match.params.userId)
            const {workProfile} = profile.data;
            this.props.updateWork(workProfile);
            if(this._isMount){
                this.setState({
                    work:this.props.work,
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
                <input className="edit-input-box" placeholder="Employer" onChange={(e)=>{this.handleInput('empName',e.target.value)}}/>
                <input className="edit-input-box" placeholder="Position" onChange={(e)=>{this.handleInput('position',e.target.value)}}/>
                <input className="edit-input-box" placeholder="Location" onChange={(e)=>{this.handleInput('empLoc',e.target.value)}}/>
                <input className="edit-input-box" placeholder="Hire Date" onChange={(e)=>{this.handleInput('hireDate',e.target.value)}}/>
                <input className="edit-input-box" placeholder="End Date" onChange={(e)=>{this.handleInput('endDate',e.target.value)}}/>
                <input className="edit-input-box-last" placeholder="Emp Logo" onChange={(e)=>{this.handleInput('empLogo',e.target.value)}}/>
            </div>
        )
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
                    work:this.props.work,
                    empName:'',
                    empLoc:'',
                    empLogo:'',
                    hireDate:'',
                    endDate:'',
                    position:'',
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
                work:this.props.work,
                empName:'',
                empLoc:'',
                empLogo:'',
                hireDate:'',
                endDate:'',
                position:'',
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

    render () {
        const {work} = this.props;
        const workProfile = work.map(job =>{
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
                    {/* {this.state.isMinimized?<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.maximize()}>+</button>:<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.minimize()}>-</button>} */}

                </div>
                <LoadingWrapper loaded={this.state.isLoaded}>
                    <div className="large-experience-section-box">
                        <p>{workProfile}</p> 
                        {this.state.addDivIsOpened && 
                            <div>
                                {this.state.addIsClicked &&
                                    this.editAddIsClicked()
                                }
                            </div>
                        }
                    </div>

                    {this.props.match.params.userId==this.props.id && 
                        <div className="add-button-container">
                            {this.state.addIsClicked ?
                                <button className="add-save-edit-button" onClick={()=>{this.addToWork()}}>Save</button>
                                :
                                <button className="add-save-edit-button" onClick={()=>this.setState({addDivIsOpened:true,addIsClicked:true})}>Add</button>
                            }
                        </div>}
                </LoadingWrapper>
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
        
export default withRouter(connect(mapStateToProps,{updateWork})(Work))