import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateLang} from '../../ducks/userActions';

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
            languages:this.props.languages,
        }
    }

    componentDidMount(){
        this.getLangProfile()
    }
    
    async getLangProfile(){
        if(this.props.id){
            const profile = await axios.get('/profile/get/languages')
            const {langProfile} = profile.data;
            console.log(2344,langProfile)
            this.props.updateLang(langProfile);
            this.setState({
                languages:this.props.languages
            })
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
        Languages:reduxState.Languages,
        id:reduxState.id
    }
}
        
export default connect(mapStateToProps,{updateLang})(Languages)