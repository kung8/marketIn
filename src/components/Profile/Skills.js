import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

class Skills extends Component {
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
            skills:this.props.skills,
        }
    }

    render () {
        return (
            <div>Skills</div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        skills:reduxState.skills
    }
}
        
export default connect(mapStateToProps,{updateWork})(Skills)