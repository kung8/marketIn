import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateViewedUser,updatePhone,updateLinkedIn} from '../../ducks/userActions'
import axios from 'axios';
import LoadingWrapper from '../Loader/LoadingWrapper';
import '../../index.css'
import {Link} from 'react-router-dom';

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
        // this.getContact();
    }

    async getUser(){
        // console.log('hit!',this.props.match.params.userId)
        // if(this._isMount){
            if(this.props.match.params.userId){
                // console.log('hit!')
                const userProfile = await axios.get('/profile/get/user/'+this.props.match.params.userId);
                // console.log(7777,userProfile.data);
                this.props.updateViewedUser(userProfile.data[0])
                // console.log('hit') 
                const contactInfo = await axios.get(`/contact/get/${this.props.match.params.userId}`);
                // console.log(999,contactInfo.data[0])
        if(contactInfo.data[0] !== undefined){
            // if(this._isMount){
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
        // console.log(prop,value)
    }

    //Need to make the add button work
    async addPhone(){
        // console.log('hit!')
        const {phone} = this.state;
        const {id} = this.props;
        if(phone!==''){
            const phoneNum = await axios.post(`/contact/add/phone/${id}`,{phone})
            // console.log(phoneNum);
            this.props.updatePhone(phoneNum.data[0].phone)
            this.setState({
                isTypingPhone:false,
                phone:''
            })
        }
    }
    async addLinkedIn(){
        // console.log('hit!')
        const {linkedIn} = this.state;
        const {id} = this.props;
        if(linkedIn !=''){
            const linked = await axios.post(`/contact/add/linkedin/${id}`, {linkedIn});
            // console.log(linked);
            this.props.updateLinkedIn(linked.data[0].linkedin)
            this.setState({
                isTypingLinkedIn:false,
                linkedIn:''
            })
        }
    }
    
    handleUpdatePhoneToggle(){
        this.setState({
            editBox1:<input placeholder="Phone" onChange={(e)=>this.handleInput('phone',e.target.value)}/>,
            isEditing1:true
        })
    }
    
    handleUpdateLinkedInToggle(){
        this.setState({
            editBox2:<input placeholder="LinkedIn" onChange={(e)=>this.handleInput('linkedIn',e.target.value)}/>,
            isEditing2:true
        })
    }

    async updatePhone(){
        const {id} = this.props;
        const {phone} = this.state;
        // console.log('entered',phone,id)
        const phoneNum = await axios.put(`/contact/update/phone/${id}`,{phone})
        // console.log(phoneNum)
        this.props.updatePhone(phoneNum.data[0].phone)
        this.setState({
            isEditing1:false,
            editBox1:'',
            phone:''
        })
    }

    async updateLinkedIn(){
        const {id} = this.props;
        const {linkedIn} = this.state;
        // console.log(linkedIn);
        const linked = await axios.put(`/contact/update/linkedin/${id}`,{linkedIn})
        // console.log(333,linked)
        this.props.updateLinkedIn(linked.data[0].linkedin)
        this.setState({
            isEditing2:false,
            editBox2:'',
            linkedIn:''
        })
    }

    render(){
        // console.log(1111,this.props,this.state)
        return(
            <div className="entire-contact-section">
                <LoadingWrapper loaded={this.state.isLoaded}>
                <div className="contact-header-holder">
                    <h1 className="contact-heading">CONTACT</h1> 
                </div>
                <div className="contact-info-holder">
                    <div className="social-media-holder">
                        <div className="social-media-logo-and-link-container">
                            <i className="far fa-envelope" style={{}}></i>
                            <a href={`mailto:${this.props.userEmail}`}><p>{this.props.userEmail}</p></a>
                        </div>
                    </div>
                    
                    {this.props.viewedUserId==this.props.id?
                        (this.props.phone!='' || null?
                        
                            (<div className="contact-info-holder">
                                <div className="social-media-holder">
                                    <div className="social-media-logo-and-link-container">
                                        <i class="fas fa-phone-square"></i>
                                        <a href={`tel:${this.state.phone}`}><p>{this.props.phone}</p></a>
                                        {this.state.editBox1}
                                        {this.state.isEditing1?<button className="add-contact-button" onClick={()=>this.updatePhone()}>Save</button>:<button className="add-contact-button" onClick={()=>this.handleUpdatePhoneToggle()}>Update</button> }   
                                    </div>
                                </div>
                            </div>)
                            :
                            (<div className="add-contact-button-holder">
                                <input className="add-contact-input-box" placeholder="phone" value={this.state.phone} onChange={(e)=>this.handleInput('phone',e.target.value)}/>
                                <button className="add-contact-button" onClick={()=>this.addPhone()}>Add phone</button>
                            </div>))
                    :
                        (this.props.phone!=''?
                            (<div className="contact-info-holder">
                                <div className="social-media-holder">
                                    <div className="social-media-logo-and-link-container">
                                        <i class="fas fa-phone-square"></i>
                                        <a href={`tel:${this.props.phone}`}><p>{this.props.phone}</p></a>    
                                    </div>
                                </div>
                            </div>)
                            :
                            null)
                    }

                    {this.props.viewedUserId==this.props.id?
                        (this.props.linkedIn != '' || null?
                            (<div className="contact-info-holder">
                                <div className="social-media-holder">
                                    <div className="social-media-logo-and-link-container">
                                        <i class="fab fa-linkedin"></i>
                                        <a href={`${this.state.linkedIn}`}><p>{this.props.linkedIn}</p></a>
                                        {this.state.editBox2}
                                        {this.state.isEditing2?<button className="add-contact-button" onClick={()=>this.updateLinkedIn()}>Save</button>:<button className="add-contact-button" onClick={()=>this.handleUpdateLinkedInToggle()}>Update</button>}    
                                    </div>
                                </div>
                            </div>)
                            :
                            (<div className="add-contact-button-holder">
                                <input className="add-contact-input-box" placeholder="LinkedIn" value={this.state.linkedIn} onChange={(e)=>this.handleInput('linkedIn',e.target.value)}/>
                                <button className="add-contact-button" onClick={()=>this.addLinkedIn()}>Add LinkedIn</button>
                            </div>))
                    :
                    (this.props.linkedIn!=''?
                        (<div className="contact-info-holder">
                            <div className="social-media-holder">
                                <div className="social-media-logo-and-link-container">
                                    <i class="fab fa-linkedin"></i>
                                    <a href={`${this.props.linkedIn}`}><p>{this.props.linkedIn}</p></a>    
                                </div>
                            </div>
                        </div>)

                            :
                            null)
                    }
                    

                    <div className="social-media-holder">
                        <div className="social-media-logo-and-link-container">
                            <i class="far fa-comment"></i>
                            <Link to='/chat'><a href='/'><p>Chat with {this.props.userFirstName}</p></a></Link>
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