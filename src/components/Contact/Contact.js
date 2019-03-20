import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateViewedUser} from '../../ducks/userActions'
import Info from './Info';
import axios from 'axios';
import LoadingWrapper from '../Util/LoadingWrapper';
import '../../index.css'

class Contact extends Component {
    constructor(){
        super();
        this.state={
            phone:'',
            linkedIn:'',
            contact:[],
            isAdd:false,
            addPhoneBox:'',
            addLinkedInBox:'',
            isLoaded:false
        }
    }
    
    componentDidMount(){
        // this.isMount=true;
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
                const contactInfo = await axios.get(`/profile/get/contact/${this.props.match.params.userId}`);
        // console.log(999,contactInfo.data[0])
        if(contactInfo.data[0] !== undefined){
            this.setState({
                phone:contactInfo.data[0].phone,
                linkedIn:contactInfo.data[0].linkedin,
                isLoaded:true
            })  
        } else {
            this.setState({
                phone:'',
                linkedIn:'',
                isLoaded:true
            })
        }
            }
        }
        
    async getContact(){
        // console.log('connected!')
        const contactInfo = await axios.get(`/profile/get/contact/${this.props.match.params.userId}`);
        // console.log(999,contactInfo.data[0])
        if(contactInfo.data[0] !== undefined){
            this.setState({
                phone:contactInfo.data[0].phone,
                linkedIn:contactInfo.data[0].linkedin
            })  
        } else {
            this.setState({
                phone:'',
                linkedIn:''
            })
        }
    }

    //Need to make the add button work
    


    render(){
        console.log(this.props)
        return(
            <div className="entire-contact-section">
                <LoadingWrapper loaded={this.state.isLoaded}>
                <div className="contact-header-holder">
                    <h1 className="contact-heading">CONTACT</h1> 
                </div>
                <div className="contact-info-holder">
                    <div className="social-media-holder">
                        <div className="social-media-logo-and-link-container">
                            <a href={`mailto:${this.props.userEmail}`}><i className="far fa-envelope" style={{}}></i></a>
                            <p>{this.props.userEmail}</p>
                        </div>
                    </div>
                    
                    {this.state.phone != '' ?(
                        <div className="social-media-holder">
                            <div className="social-media-logo-and-link-container">
                                <a href={`tel:${this.state.phone}`}><i class="fas fa-phone-square"></i></a> 
                                <p>{this.state.phone}</p>
                            </div>
                            {this.props.viewedUserId==this.props.id?(<button className="add-contact-button">Update</button>):(null)}
                        </div>)
                        :
                        (this.props.viewedUserId==this.props.id?(<div className="add-contact-button-holder"><button className="add-contact-button">Add Phone</button></div>):null)}

                    {this.state.linkedIn !== '' ?(
                        <div className="social-media-holder">
                            <div className="social-media-logo-and-link-container">
                                <a href={`${this.state.linkedIn}`}><i class="fab fa-linkedin"></i></a>
                                <p>{this.state.linkedIn}</p>    
                            </div>
                            {this.props.viewedUserId==this.props.id?(<button className="add-contact-button">Update</button>):null}
                        </div >)
                        :
                        (this.props.viewedUserId==this.props.id?(<div className="add-contact-button-holder"><button className="add-contact-button">Add LinkedIn</button></div>):null)}

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
        id:reduxState.id
    }
}

export default connect(mapStateToProps, {updateViewedUser})(Contact)