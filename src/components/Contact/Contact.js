import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateViewedUser,updatePhone,updateLinkedIn} from '../../ducks/userActions'
import Info from './Info';
import axios from 'axios';
import LoadingWrapper from '../Util/LoadingWrapper';
import '../../index.css'

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
            isTypingLinkedIn:true
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
        console.log(999,contactInfo.data[0])
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
        
    // async getContact(){
    //     // console.log('connected!')
    //     const contactInfo = await axios.get(`/profile/get/contact/${this.props.match.params.userId}`);
    //     console.log(999,contactInfo.data[0])
    //     this.props.updatePhone(contactInfo.data[0].phone)
    //     this.props.updateLinkedIn(contactInfo.data[0].linkedin)
        // if(contactInfo.data[0] !== undefined){
        //     this.setState({
        //         phone:contactInfo.data[0].phone,
        //         linkedIn:contactInfo.data[0].linkedin
        //     })  
        // } else {
        //     this.setState({
        //         phone:'',
        //         linkedIn:''
        //     })
        // }
    // }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
        console.log(prop,value)
    }

    //Need to make the add button work
    async addPhone(){
        // console.log('hit!')
        const {phone} = this.state;
        const {id} = this.props;
        if(phone!==''){
            const phoneNum = await axios.post(`/contact/add/phone/${id}`,{phone})
            console.log(phoneNum);
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
            console.log(linked);
            this.props.updateLinkedIn(linked.data[0].linkedin)
            this.setState({
                isTypingLinkedIn:false,
                linkedIn:''
            })
        }
    }
    
    async updatePhone(){
        const phone = await axios.put('/contact/update/phone')
    }
    async updateLinkedIn(){
        const LinkedIn = await axios.put('/contact/update/linkedin')
    }

    render(){
        console.log(1111,this.props,this.state)
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
                                        <button className="add-contact-button">Update</button>    
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
                            <div className="social-media-logo-and-link-container">
                            </div>
                            )
                    }

                    {this.props.viewedUserId==this.props.id?
                        (this.props.linkedIn != '' || null?
                            (<div className="contact-info-holder">
                                <div className="social-media-holder">
                                    <div className="social-media-logo-and-link-container">
                                        <i class="fab fa-linkedin"></i>
                                        <a href={`${this.state.linkedIn}`}><p>{this.props.linkedIn}</p></a>
                                        <button className="add-contact-button">Update</button>    
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
                            <div className="social-media-logo-and-link-container">
                            </div>
                            )
                    }
                    


                    {/* {this.state.linkedIn !== ''?(
                        <div className="social-media-holder">
                            <div className="social-media-logo-and-link-container">
                                <a href={`${this.state.linkedIn}`}><i class="fab fa-linkedin"></i></a>
                                <p>{this.state.linkedIn}</p>    
                            </div>
                            {this.props.viewedUserId==this.props.id?(<button className="add-contact-button">Update</button>):(
                            <div className="add-contact-button-holder">
                                <input className="add-contact-input-box" placeholder="LinkedIn" value={this.state.linkedIn} onChange={(e)=>this.handleInput('linkedIn',e.target.value)}/>
                                <button className="add-contact-button" onClick={()=>this.addLinkedIn()}>Add LinkedIn</button>
                            </div>)}
                        </div>):null} */}

                    {/* <div className="social-media-holder">
                        <div className="social-media-logo-and-link-container">
                            <p>Chat: <a href='/'>Set up Socket.io?</a></p>
                        </div>
                    </div> */}
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
        phone:reduxState.phone
    }
}

export default connect(mapStateToProps, {updateViewedUser,updatePhone,updateLinkedIn})(Contact)