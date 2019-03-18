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

    render(){
        console.log(this.props)
        return(
            <div style={{marginTop:90}}>
                <LoadingWrapper loaded={this.state.isLoaded}>
                    <h1>Contact</h1> 
                    <p><i className="far fa-envelope" style={{}}></i> <a href={`mailto:${this.props.userEmail}`}>{this.props.userEmail}</a></p> 
                    <br/>
                    <br/>
                    <p><i class="fas fa-phone-square"></i> <a href={`tel:${this.state.phone}`}>{this.state.phone}</a></p>
                    
                    {this.props.viewedUserId==this.props.id?(<div>
                        {this.state.phone===''?<button>Add</button>:
                        <button>Update</button>}
    </div>):null}
                    
                    <br/>
                    <br/>
                    <p><i class="fab fa-linkedin"></i><a href='/'>{this.state.linkedIn}</a></p>
                    
                    {this.props.viewedUserId==this.props.id?(<div>
                        {this.state.linkedIn===''?(<button>Add</button>):
                        (<button>Update</button>)}
                    </div>):null}
                    
                    <br/>
                    <br/>
                    <p>Chat: <a href='/'>Set up Socket.io?</a></p>
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