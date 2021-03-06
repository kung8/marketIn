import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateProject} from '../../../ducks/userActions';
import Project from './Project';
import {withRouter} from 'react-router-dom';
import LoadingWrapper from '../../Loader/LoadingWrapper';

class Projects extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            projects:'',
            project:'',
            addDivIsOpened:false,
            isMinimized:false,
            isLoaded:false
        }
    }

    componentDidMount(){
        this._isMount = true;
        this.getProjProfile()
    }
    
    async getProjProfile(){
        if(this.props.match.params.userId){
            const profile = await axios.get('/profile/get/projects/'+this.props.match.params.userId);
            const {projProfile} = profile.data;
            this.props.updateProject(projProfile);
            if(this._isMount){
                this.setState({
                    projects:this.props.projects,
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

        editAddIsClicked(){
            return(
                <div>
                    <input placeholder="Project" className="add-input-box" onChange={(e)=>{this.handleInput('project',e.target.value)}}/>
                </div>
            )        
        }
    
        addToProj=async()=>{
            const {project,projects} = this.state;
            if(project !== ''){
                projects.push({project});
                let projProfile = await axios.post('/profile/create/project',{project})
                if(this._isMount){
                    await this.props.updateProject(projProfile.data);
                    this.setState({
                        addIsClicked:false,
                        projects:this.props.projects,
                        inputBox1:'',
                        addDivIsOpened:false,
                        project:''
                    })
                }
            } else {
                this.setState({
                    addIsClicked:false,
                    inputBox1:'',
                    project:'',
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
        const {projects} = this.props;
        const projProfile = projects.map(proj =>{
            return (
                <Project 
                    key={proj.id}
                    proj={proj}
                    />
            )
        })

        return (
            <div>
                <div className="section-header-holder">
                    <h1 className="section-header">PROJECTS</h1>
                    {/* {this.state.isMinimized?<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.maximize()}>+</button>:<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.minimize()}>-</button>} */}
                </div>
                <LoadingWrapper loaded={this.state.isLoaded}>
                    <div className="small-experience-section-box">
                        <p>{projProfile}</p>
                        {this.state.addDivIsOpened && 
                            <div className="add-small-input-box-container">
                                {this.state.addIsClicked &&
                                this.editAddIsClicked() 
                                }
                            </div>
                        }
                    </div>


                    {this.props.match.params.userId==this.props.id && 
                        <div className="add-button-container">
                            {this.state.addIsClicked?
                                <button className="add-save-edit-button" onClick={()=>this.addToProj()}>Save</button>
                                :
                                <button className="add-save-edit-button" onClick={()=>this.setState({addIsClicked:true,addDivIsOpened:true})}>Add</button>
                            }
                        </div>
                    }
                </LoadingWrapper>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        projects:reduxState.projects,
        id:reduxState.id
    }
}
        
export default withRouter(connect(mapStateToProps,{updateProject})(Projects))