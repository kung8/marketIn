import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateViewedUser,updatePhone,updateLinkedIn} from '../../ducks/userActions'
import axios from 'axios';
import LoadingWrapper from '../Loader/LoadingWrapper';
import '../../index.css'
import {Link} from 'react-router-dom';

const body = {background:'navy',marginTop:85,minHeight:426,marginBottom:5,width:'100vw'}
const header = {background:'navy', width:'100vw',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',minHeight:50};
const heading = {color:'white',letterSpacing:'0.05em'};
const logoHolder = {display:'flex',alignItems:'center',textAlign:'left',flexDirection:'column',width:310};
const logo = {fontSize:70,marginTop:5,marginLeft:5};
const text = {fontSize:25,textDecoration:'none',maxWidth:310};
const buttonHolder = {display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',background:'silver',height:100,marginBottom:5};
const input = {width:260,height:50,fontSize:35,border:'solid black',textAlign:'center'};   
const button = {fontSize:25,width:160,height:40,background:'black',color:'white',borderRadius:'25%',marginRight:5};

class Contact extends Component {
    constructor(props){
        super(props);
        this.state={
            phone:this.props.phone,
            linkedIn:this.props.linkedIn,
            contact:[],
            isAdd:false,
            addPhoneBox:'',
            addLinkedInBox:'',
            isLoaded:false,
            isTypingPhone:true,
            isTypingLinkedIn:true,
            editBox1:'',
            editBox2:'',
            isEditing1:false,
            isEditing2:false
        }
    }
    
    componentDidMount(){
        this.isMount=true;
        this.getUser();
    }

    async getUser(){
            if(this.props.match.params.userId){
                const userProfile = await axios.get('/profile/get/user/'+this.props.match.params.userId);
                this.props.updateViewedUser(userProfile.data[0])
                const contactInfo = await axios.get(`/contact/get/${this.props.match.params.userId}`);
        if(contactInfo.data[0] !== undefined){
            this.props.updatePhone(contactInfo.data[0].phone)
            this.props.updateLinkedIn(contactInfo.data[0].linkedin)
            this.setState({
                phone:contactInfo.data[0].phone,
                linkedIn:contactInfo.data[0].linkedin,
                isLoaded:true
            })  
        } else {
            let phone = ''
            let linkedIn = ''
            this.props.updateLinkedIn(linkedIn)
            this.props.updatePhone(phone)
            this.setState({
                phone:'',
                linkedIn:'',
                isLoaded:true
            })
        }
            }
        }
        

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    //Need to make the add button work
    async addPhone(){
        const {phone} = this.state;
        const {id} = this.props;
        if(phone!==''){
            const phoneNum = await axios.post(`/contact/add/phone/${id}`,{phone})
            this.props.updatePhone(phoneNum.data[0].phone)
            this.setState({
                isTypingPhone:false,
                phone:''
            })
        }
    }
    async addLinkedIn(){
        const {linkedIn} = this.state;
        const {id} = this.props;
        if(linkedIn !=''){
            const linked = await axios.post(`/contact/add/linkedin/${id}`, {linkedIn});
            this.props.updateLinkedIn(linked.data[0].linkedin)
            this.setState({
                isTypingLinkedIn:false,
                linkedIn:''
            })
        }
    }
    
    handleUpdatePhoneToggle(){
        this.setState({
            editBox1:<input style={input} placeholder="Phone" onChange={(e)=>this.handleInput('phone',e.target.value)}/>,
            isEditing1:true
        })
    }
    
    handleUpdateLinkedInToggle(){
        this.setState({
            editBox2:<input style={input} placeholder="LinkedIn" onChange={(e)=>this.handleInput('linkedIn',e.target.value)}/>,
            isEditing2:true
        })
    }

    async updatePhone(){
        const {id} = this.props;
        const {phone} = this.state;
        if(phone !== ''){
            const phoneNum = await axios.put(`/contact/update/phone/${id}`,{phone})
            this.props.updatePhone(phoneNum.data[0].phone)
            this.setState({
                isEditing1:false,
                editBox1:'',
                phone:''
            })
        } else {
            this.setState({
                isEditing1:false,
                editBox1:'',
                phone:''
            })
        }
    }

    async updateLinkedIn(){
        const {id} = this.props;
        const {linkedIn} = this.state;
        if(linkedIn !==''){
            const linked = await axios.put(`/contact/update/linkedin/${id}`,{linkedIn})
            this.props.updateLinkedIn(linked.data[0].linkedin)
            this.setState({
                isEditing2:false,
                editBox2:'',
                linkedIn:''
            })
        } else {
            this.setState({
                isEditing2:false,
                editBox2:'',
                linkedIn:''
            })
        }
    }

    render(){
        const {viewedUserId} = this.props;
        return(
            <div style={body}>
                <LoadingWrapper loaded={this.state.isLoaded}>
                <div style={header}>
                    <h1 style={heading}>CONTACT</h1> 
                </div>
                <div>
                    <div className="contact-section">
                        <div style={logoHolder}>
                            <i className="far fa-envelope" style={logo}></i>
                            <a href={`mailto:${this.props.userEmail}`} style={text}><p>{this.props.userEmail}</p></a>
                        </div>
                    </div>
                    
                    {this.props.viewedUserId==this.props.id?
                        (this.props.phone!='' || null?
                        
                            (<div>
                                <div className="contact-section">
                                    <div style={logoHolder}>
                                        <i className="fas fa-phone-square" style={logo}></i>
                            <a href={`tel:${this.state.phone}`} style={text}>{this.state.isEditing1?<>{this.state.editBox1}</>:<p>{this.props.phone}</p>}</a>
                                        {this.state.isEditing1?<button style={button} onClick={()=>this.updatePhone()}>Save</button>:<button style={button} onClick={()=>this.handleUpdatePhoneToggle()}>Update</button> }   
                                    </div>
                                </div>
                            </div>)
                            :
                            (<div style={buttonHolder}>
                                <input style={input} placeholder="phone" value={this.state.phone} onChange={(e)=>this.handleInput('phone',e.target.value)}/>
                                <button style={button} onClick={()=>this.addPhone()}>Add phone</button>
                            </div>))
                    :
                        (this.props.phone!=''?
                            (<div>
                                <div className="contact-section">
                                    <div style={logoHolder}>
                                        <i className="fas fa-phone-square" style={logo}></i>
                                        <a href={`tel:${this.props.phone}`} style={text}><p>{this.props.phone}</p></a>    
                                    </div>
                                </div>
                            </div>)
                            :
                            null)
                    }

                    {this.props.viewedUserId==this.props.id?
                        (this.props.linkedIn != '' || null?
                            (<div >
                                <div className="contact-section">
                                    <div style={logoHolder}>
                                        <i className="fab fa-linkedin" style={logo}></i>
                            <a href={`${this.state.linkedIn}`} style={text}>{this.state.isEditing2?<>{this.state.editBox2}</>:<p>{this.props.linkedIn}</p>}</a>
                                        
                                        {this.state.isEditing2?<button style={button} onClick={()=>this.updateLinkedIn()}>Save</button>:<button style={button} onClick={()=>this.handleUpdateLinkedInToggle()}>Update</button>}    
                                    </div>
                                </div>
                            </div>)
                            :
                            (<div style={buttonHolder}>
                                <input style={input} placeholder="LinkedIn" value={this.state.linkedIn} onChange={(e)=>this.handleInput('linkedIn',e.target.value)}/>
                                <button style={button} onClick={()=>this.addLinkedIn()}>Add LinkedIn</button>
                            </div>))
                    :
                    (this.props.linkedIn!=''?
                        (<div>
                            <div className="contact-section">
                                <div style={logoHolder}>
                                    <i className="fab fa-linkedin" style={logo}></i>
                                    <a href={`${this.props.linkedIn}`} style={text}><p>{this.props.linkedIn}</p></a>    
                                </div>
                            </div>
                        </div>)

                            :
                            null)
                    }
                    

                    <div className="contact-section">
                        <div style={logoHolder}>
                            <i className="far fa-comment" style={logo}></i>
                            <Link to={`/chat/${viewedUserId}`} style={text}><a href='/'><p>Chat with {this.props.userFirstName}</p></a></Link>
                        </div>
                    </div>
                </div>
                </LoadingWrapper>
            </div>
        )
    }
}

//bring in the image logos so it looks a lot cleaner
//create an SQL table for contact info. 

function mapStateToProps(reduxState){
    return{
        userEmail:reduxState.userEmail,
        viewedUserId:reduxState.viewedUserId,
        id:reduxState.id,
        linkedIn:reduxState.linkedIn,
        phone:reduxState.phone,
        userFirstName:reduxState.userFirstName
    }
}

export default connect(mapStateToProps, {updateViewedUser,updatePhone,updateLinkedIn})(Contact)