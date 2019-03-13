import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateLang} from '../../../ducks/userActions';
import Language from './Language';

class Languages extends Component {
    constructor(props){
        super(props);
        this.state={
            addIsClicked: false,
            inputBox1:'',
            languages:this.props.languages,
            language:'',
            addDivIsOpened:false,
            isMinimized:false
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

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    editAddIsClicked(){
        this.setState({
            addIsClicked:true,
            inputBox1:<input className="add-input-box" onChange={(e)=>{this.handleInput('language',e.target.value)}}/>,
            addDivIsOpened:true
        })
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
                addDivIsOpened:false
            })
        } else {
            this.setState({
                addIsClicked:false,
                inputBox1:'',
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
            // console.log(3333,lang)
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
                <p>{langProfile}</p>
                {this.state.addDivIsOpened?
                (<div className="add-small-input-box-container">
                    {this.state.inputBox1}
                </div>):(this.state.inputBox1)
                }
                <div className="add-button-container">
                    {this.state.addIsClicked?(<button className="add-save-button" onClick={()=>this.addToLang()}>SAVE</button>):(<button className="add-save-button" onClick={()=>this.editAddIsClicked()}>ADD</button>)}
                </div>
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