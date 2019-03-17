import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateServices} from '../../ducks/userActions';

class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false,
            editBox1:'',
            editBox2:'',
            editBox3:'',
            image:'',
            service:'',
            userId:'',
            price:'',
            services:this.props.services
        }
    }


    handleInput (prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleEditToggle(){
        this.setState({
            isEditing:true,
            editBox1:<input placeholder="Service" onChange={(e)=>this.handleInput('service',e.target.value)}/>,
            editBox2:<input placeholder="Price" onChange={(e)=>this.handleInput('price',e.target.value)}/>,
            editBox3:<input placeholder="Image" onChange={(e)=>this.handleInput('image',e.target.value)}/>
        })
    }

    render() {
        const {serv} = this.props;
        return (
        <div className="service-section-box">
                <div className="service-mapped-items">
                    <img src={serv.image} alt="service"/>
                    <p>{serv.service}</p>
                    <p>{serv.price}</p>
                </div>
                
                <div className="edit-service-input-box-container">
                    {this.state.editBox1}
                    {this.state.editBox2}
                    {this.state.editBox3}
                </div>
                
                {this.props.id==this.props.match.params.userId?(
                    <div className="edit-delete-service-buttons-container">
                        {this.state.isEditing?
                            (<button onClick={()=>{this.props.edit(serv)}} className="edit-service-button">Save</button>)
                                :(<button onClick={()=>{this.handleEditToggle()}} className="edit-service-button">Edit</button>)}
                        <button className="delete-service-button" onClick={()=>{this.props.delete(serv)}}>Delete</button>  
                    </div>):
                    (<div className='purchase-chat-buttons-container'>
                        <button className="purchase-service-button">Purchase</button>
                        <button className="add-save-edit-button">Chat</button>
                    </div>)}
        </div>)
    }
}

function mapStateToProps(reduxState){
    return{
        id:reduxState.id,
        viewedUserId:reduxState.viewedUserId,
        userId:reduxState.userId,
        services:reduxState.services
    }
}

export default withRouter(connect(mapStateToProps, {updateServices})(Service));