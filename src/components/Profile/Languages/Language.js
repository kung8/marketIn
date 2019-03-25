import React, {Component} from 'react';
import axios from 'axios';
import {updateLang} from '../../../ducks/userActions';
import { connect  } from "react-redux";
import {withRouter} from 'react-router-dom';

class Language extends Component {
    constructor(props){ 
        super(props);
        this.state={
            isEditing:false,
            isEditOpened:false,
            language:'',
            languages:this.props.languages,
        }
    }

    componentDidMount(){
        this._isMount = true;
    }


    async deleteLangProfile(lang){
        const {id} = lang;
        const langProfile = await axios.delete(`/profile/delete/language/${id}`);
        this.props.updateLang(langProfile.data);
        this.setState({
            languages:langProfile.data,
            language:''
        })
    }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }
    
    handleEditToggle=()=>{
        return(
            <input value={this.state.language} className="edit-input-box" onChange={(e)=>this.handleInput('language',e.target.value)}/>
        )
    }

    async edit(lang){
        const {language} = this.state;
        try {
            if(language !=='' ){
                const {id,user_id} = lang;
                const langProfile = await axios.put('/profile/edit/language',{language,id,user_id})
                if(this._isMount){
                    this.props.updateLang(langProfile.data)
                    this.setState({
                        isEditing:false,
                        isEditOpened:false,
                        language:'',
                        languages:this.props.languages
                    }) 
                }
            }   else {
                    this.setState({
                        isEditing:false,
                        isEditOpened:false,
                        language:'',
                        languages:this.props.languages
                    })
                }
        } catch (err){
            alert(err)
        }
    }

    render (){
        const {lang} = this.props;
        return (
            <div className="small-experience-box">
                {this.state.isEditOpened?
                    <div>
                        {this.state.isEditing && 
                        this.handleEditToggle()
                        }
                    </div>
                    :
                    <div>
                        <p>{lang.language}</p>
                    </div>
                }

                {this.props.match.params.userId==this.props.id &&
                    <div className="input-edit-delete-container">
                        <div>
                            {this.state.isEditing?
                                <button className="add-save-edit-button" onClick={()=>this.edit(lang)}>Save</button>
                                :
                                <button className="add-save-edit-button" onClick={()=>this.setState({language:lang.language,isEditing:true,isEditOpened:true})}>Edit</button>
                            }
                            
                            <button className="small-section-delete-button" onClick={()=>{this.deleteLangProfile(lang)}}>Delete</button>
                        </div>
                    </div>
                }
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