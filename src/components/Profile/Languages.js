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
            languages:this.props.languages,
            language:''
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
            inputBox1:<input onChange={(e)=>{this.handleInput('language',e.target.value)}}/>,
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
                inputBox1:''
            })
        } else {
            this.setState({
                addIsClicked:false,
                inputBox1:''
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
                {this.state.inputBox1}
                {this.state.addIsClicked?(<button onClick={()=>this.addToLang()}>Save</button>):(<button onClick={()=>this.editAddIsClicked()}>Add Language</button>)}
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