import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateLang} from '../../../ducks/userActions';
import Language from './Language';
import {withRouter} from 'react-router-dom';
import LoadingWrapper from '../../Loader/LoadingWrapper';

class Languages extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            languages:'',
            language:'',
            addDivIsOpened:false,
            isMinimized:false,
            isLoaded:false
        }
    }

    componentDidMount(){
        this.getLangProfile()
    }
    
    async getLangProfile(){
        if(this.props.match.params.userId){
            const profile = await axios.get('/profile/get/languages/'+this.props.match.params.userId)
            const {langProfile} = profile.data;
            this.props.updateLang(langProfile);
            this.setState({
                languages:this.props.languages,
                isLoaded:true
            })
        }
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    editAddIsClicked(){
        return(
            <input placeholder="Language" className="add-input-box" onChange={(e)=>{this.handleInput('language',e.target.value)}}/>
        )
    }

    addToLang=async()=>{
        const {language,languages} = this.state;
        if(language !== ''){
            languages.push({language});
            let langProfile = await axios.post('/profile/create/language',{language})
            this.props.updateLang(langProfile.data);
            this.setState({
                addIsClicked:false,
                languages:this.props.languages,
                inputBox1:'',
                addDivIsOpened:false,
                language:''
            })
        } else {
            this.setState({
                addIsClicked:false,
                inputBox1:'',
                language:'',
                addDivIsOpened:false
            })
        }
    }

    minimize(){
        this.setState({
            isMinimized:true
        })
    }

    maximize(){
        this.setState({
            isMinimized:false
        })
    }

    render () {
        const {languages} = this.props 
        const langProfile = languages.map(lang =>{
            return (
                <Language 
                    key={lang.id}
                    lang={lang}
                    />
            )
        })

        return (
            <div>
                <div className="section-header-holder">
                    <h1 className="section-header">LANGUAGES</h1>
                    {/* {this.state.isMinimized?<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.maximize()}>+</button>:<button style={{background:"black", color:"white", height:"40px", width:"40px"}} onClick={()=>this.minimize()}>-</button>} */}

                </div>
                <LoadingWrapper loaded={this.state.isLoaded}>
                    <div className="small-experience-section-box">
                        <p>{langProfile}</p>
                        {this.state.addDivIsOpened?
                        (<div className="add-small-input-box-container">
                            {this.state.addIsClicked && 
                                this.editAddIsClicked()
                            }
                        </div>):(this.state.inputBox1)
                        }
                    </div>
                    
                    {this.props.match.params.userId==this.props.id && 
                        <div className="add-button-container">
                            {this.state.addIsClicked?
                                <button className="add-save-edit-button" onClick={()=>this.addToLang()}>Save</button>
                                :
                                <button className="add-save-edit-button" onClick={()=>this.setState({addDivIsOpened:true,addIsClicked:true})}>Add</button>
                            }
                        </div>
                    }
                </LoadingWrapper>
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
        
export default withRouter(connect(mapStateToProps,{updateLang})(Languages))