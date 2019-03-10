import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

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
            education:this.props.education,
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
        
export default connect(mapStateToProps,{updateWork})(Projects)