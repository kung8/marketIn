import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateProject} from '../../ducks/userActions';

class Projects extends Component {
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
            projects:this.props.projects,
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

    async deleteProjProfile(proj){
            const {id} = proj;
            const projProfile = await axios.delete(`/profile/delete/project/${id}`);
            this.props.updateProject(projProfile.data);
            this.setState({
                projects:projProfile.data
            })
        }

    render () {
        const {projects} = this.props;
        const projProfile = projects.map(proj =>{
            // console.log(3333,proj)
            return (
                <div key={proj.id}>
                    <p>{proj.project}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteProjProfile(proj)}}>Delete</button>
                </div>
            )
        })

        return (
            <div>
                <h1>Projects</h1>
                <p>{projProfile}</p>
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