import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateWork} from '../../ducks/userActions';

class Languages extends Component {
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
            <div>Languages</div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        Languages:reduxState.Languages
    }
}
        
export default connect(mapStateToProps,{updateWork})(Languages)