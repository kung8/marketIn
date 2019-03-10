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
            languages:this.props.languages
        }
    }

    componentDidMount(){
        this.getLangProfile()
    }
    
    async getLangProfile(){
        if(this.props.id){
            console.log('hit')
            const profile = await axios.get('/profile/get/languages')
            const {langProfile} = profile.data;
            console.log(2344,langProfile)
            this.props.updateLang(langProfile);
            this.setState({
                languages:this.props.languages
            })
        }
    }

    async deleteLangProfile(lang){
        const {id} = lang;
        const langProfile = await axios.delete(`/profile/delete/language/${id}`);
        this.props.updateLang(langProfile.data);
        this.setState({
            languages:langProfile.data,
        })
    }

    render () {
        const {languages} = this.props 
        const langProfile = languages.map(lang =>{
            // console.log(3333,lang)
            return (
                <div lang={lang.id}>
                    <p>{lang.language}</p>
                    <button>Edit</button>
                    <button onClick={()=>{this.deleteLangProfile(lang)}}>Delete</button>
                </div>
            )
        })

        return (
            <div>
                <h1>Languages</h1>
                <p>{langProfile}</p>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{            
        languages:reduxState.languages,
        id:reduxState.id
    }
}
        
export default connect(mapStateToProps,{updateLang})(Languages)