import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateProject} from '../../../ducks/userActions';
import Project from './Project';
import {withRouter} from 'react-router-dom';

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
        if(this.props.id){
            const profile = await axios.get('/profile/get/projects/'+this.props.match.params.userId);
            const {projProfile} = profile.data;
            this.props.updateProject(projProfile);
            if(this._isMount){
                this.setState({
                    projects:this.props.projects
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
            this.setState({
                addIsClicked:true,
                inputBox1:<input className="add-input-box" onChange={(e)=>{this.handleInput('project',e.target.value)}}/>,
                addDivIsOpened:true
            })
        }
    
        addToProj=async()=>{
            const {project,projects} = this.state;
            // console.log('hit')
            if(project !== ''){
                projects.push({project});
                let projProfile = await axios.post('/profile/create/project',{project})
                console.log(5555,projProfile)
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
            console.log(3333,proj)
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
                <p>{projProfile}</p>
                {this.state.addDivIsOpened?
                (<div className="add-small-input-box-container">
                    {this.state.inputBox1}
                </div>):(this.state.inputBox1)
                }

                {this.props.match.params.userId==this.props.id?(<div className="add-button-container">
                    {this.state.addIsClicked?(<button className="add-save-button" onClick={()=>{this.addToProj()}}>SAVE</button>):(<button className="add-save-button" onClick={()=>{this.editAddIsClicked()}}>ADD</button>)}
                </div>):null}
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