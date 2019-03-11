import React, {Component} from 'react';
import axios from 'axios';
import {updateLang} from '../../ducks/userActions';
import { connect  } from "react-redux";

class Language extends Component {
    constructor(props){ 
        super(props);
        this.state={
            edit:false,
            editBox:'',
            languages:this.props.languages,
            language:''
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
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle=()=>{
        this.setState({
            edit:true,
            editBox:<input onChange={(e)=>this.handleInput('language',e.target.value)}/>
        })
    }

    render (){
        const {lang} = this.props;
        return (
            <div lang={lang.id}>
                    <p>{lang.language}</p>
                    {this.state.editBox}
                    {this.state.edit?(<button onClick={()=>this.edit(lang)}>Save</button>):<button onClick={()=>{this.handleEditToggle(lang)}}>Edit</button>}
                    <button onClick={()=>{this.deleteLangProfile(lang)}}>Delete</button>
                </div>
            
        )
    }
}

function mapStateToProps(reduxState){
    return{
        languages:reduxState.languages
    }
}

export default connect(mapStateToProps,{updateLang})(Language)