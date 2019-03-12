import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateProject} from '../../../ducks/userActions';
import Project from './Project';

class Projects extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            projects:this.props.projects,
            project:'',
            addDivIsOpened:false
        }
    }

    componentDidMount(){
        this.getProjProfile()
    }
    
    async getProjProfile(){
        if(this.props.id){
            const profile = await axios.get('/profile/get/projects');
            const {projProfile} = profile.data;
            this.props.updateProject(projProfile);
            this.setState({
                projects:this.props.projects
            })
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
            console.log('hit')
            if(project !== ''){
                projects.push({project});
                let projProfile = await axios.post('/profile/create/project',{project})
                this.props.updateProject(projProfile.data);
                this.setState({
                    addIsClicked:false,
                    projects:this.props.projects,
                    inputBox1:'',
                    addDivIsOpened:false
                })
            } else {
                this.setState({
                    addIsClicked:false,
                    inputBox1:'',
                    addDivIsOpened:false
                })
            }
        }

    render () {
        const {projects} = this.props;
        const projProfile = projects.map(proj =>{
            // console.log(3333,proj)
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
                    {this.state.addIsClicked?(<button className="add-save-button" onClick={()=>{this.addToProj()}}>SAVE</button>):(<button className="add-save-button" onClick={()=>{this.editAddIsClicked()}}>ADD</button>)}
                </div>
                <p>{projProfile}</p>
                {this.state.addDivIsOpened?
                (<div className="add-small-input-box-container">
                    {this.state.inputBox1}
                </div>):(this.state.inputBox1)
                }
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
        
export default connect(mapStateToProps,{updateProject})(Projects)