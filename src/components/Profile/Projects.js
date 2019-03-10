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

    render () {
        return (
            <div>Work</div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        projects:reduxState.projects
    }
}
        
export default connect(mapStateToProps,{updateProject})(Projects)