import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateViewedUser} from '../../ducks/userActions'
import Info from './Info';
import axios from 'axios';

class Contact extends Component {
    constructor(){
        super();
        this.state={
            phone:'',
            linkedIn:'',
            contact:[],
            isAdd:false,
            addPhoneBox:'',
            addLinkedInBox:''
        }
    }
    
    componentDidMount(){
        // this.isMount=true;
        this.getUser();
    }

    async getUser(){
        // console.log('hit!',this.props.match.params.userId)
        // if(this._isMount){
            if(this.props.match.params.userId){
                console.log('hit!')
                const userProfile = await axios.get('/profile/get/user/'+this.props.match.params.userId);
                // console.log(7777,userProfile.data);
                this.props.updateViewedUser(userProfile.data[0])
                // this.setState({
                //     count:this.state.count++
                // })
            // }
        }
    }

    render(){
        console.log(this.props)
        return(
            <div style={{marginTop:90}}>
                <h1>Contact</h1> 
                <p>Phone: <a href='tel:5716239450'>571-623-9450</a></p>
                <p>Phone: {this.props.userPhone?<a href='tel:5716239450'>+1 (571) 623-9450</a>:null}</p>
                {this.props.viewedUserId==this.props.id?<div>
                    <button>Add</button>
                    <button>Update</button>
                </div>:null}
                
                <br/>
                <br/>
                <p>Email: <a href={`mailto:${this.props.userEmail}`}>{this.props.userEmail}</a></p> 
                <br/>
                <br/>
                <p>LinkedIn:{this.props.userLinkedIn?<a href='/'>LinkedIn URL</a>:null}</p>
                <button>Add</button>
                <button>Update</button>
                
                <br/>
                <br/>
                <p>Chat: <a href='/'>Set up Socket.io?</a></p>
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