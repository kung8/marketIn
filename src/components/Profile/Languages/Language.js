import React, {Component} from 'react';
import axios from 'axios';
import {updateLang} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import {withRouter} from 'react-router-dom';

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
            editBox:<input className="edit-input-box" onChange={(e)=>this.handleInput('language',e.target.value)}/>
        })
    }

    async edit(lang){
        const {language} = this.state;
        try {
            if(language !=='' ){
                const {id,user_id} = lang;
                // console.log(user_id)
                const langProfile = await axios.put('/profile/edit/language',{language,id,user_id})
                // console.log(444,workProfile.data[0])
                this.props.updateLang(langProfile.data)
                this.setState({
                    edit:false,
                    editBox:'',
                    language:''
                    
                }) 
            }   else {
                    this.setState({
                        edit:false,
                        editBox:'',
                        skill:''
                    })
                }
        } catch (err){
            alert(err)
        }
    }

    render (){
        const {lang} = this.props;
        return (
            <div className="small-experience-section-box" lang={lang.id}>
                <div className="small-experience-box">
                    <p>{lang.language}</p>
                </div>
                {this.props.match.params.userId==this.props.id?(
                <div className="input-edit-delete-container">
                    {this.state.editBox}
                    <div>
                        {this.state.edit?(<button className="edit-save-button" onClick={()=>this.edit(lang)}>Save</button>):<button className="edit-save-button" onClick={()=>{this.handleEditToggle(lang)}}>Edit</button>}
                        <button className="small-section-delete-button" onClick={()=>{this.deleteLangProfile(lang)}}>Delete</button>
                    </div>
                </div>):null}
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

export default withRouter(connect(mapStateToProps,{updateLang})(Language))