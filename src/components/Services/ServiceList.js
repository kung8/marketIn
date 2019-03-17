import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ServiceList extends Component {
    constructor(props){
        super(props);
        this.state={
            image:'',
            service:'',
            userId:'',
            price:'',
            services:[],
            isAdded:false,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            isAddOpened:false,
            isEditing:false,
            editBox1:'',
            editBox2:'',
            editBox3:''
        }

    }
    
    componentDidMount(){
        this.getService()
    }

    getService=async()=>{
        const {userId} = this.props.match.params;
        const services = await axios.get(`/services/get/${userId}`)
        console.log(services.data);
        this.setState({
            services:services.data
        })
    }
    
    handleInput (prop,value){
        this.setState({
            [prop]:value
        })
    }

    toggleAdd(){
        this.setState({
            isAdded:true,
            isAddOpened:true,
            inputBox1:<input className="add-service-input-box" placeholder="Service" onChange={(e)=>{this.handleInput('service',e.target.value)}}/>,
            inputBox2:<input className="add-service-input-box" placeholder="Price" onChange={(e)=>{this.handleInput('price',e.target.value)}}/>,
            inputBox3:<input className="add-service-input-box" placeholder="Image" onChange={(e)=>{this.handleInput('image',e.target.value)}}/>,
        })
    }

    async saveAdd(){
        const {price,service,image} = this.state;
        console.log(333,price,service,image)
        const {id} = this.props;
        if(price!==''&& service!=='' && image!==''){
            console.log('hit!')
            console.log(111,price,service,image,id)
            const services = await axios.post('/service/add',{price,service,image,id})
            console.log(22222,services.data)
            this.setState({
                services:services.data,
                isAdded:false,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                isAddOpened:false
            })
        } else {
            this.setState({
                isAdded:false,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                isAddOpened:false
            })
        }
    }

    handleEditToggle(){
        this.setState({
            isEditing:true,
            editBox1:<input onChange={(e)=>this.handleInput('Service',e.target.value)}/>,
            editBox2:<input onChange={(e)=>this.handleInput('Price',e.target.value)}/>,
            editBox3:<input onChange={(e)=>this.handleInput('Image',e.target.value)}/>
        })
    }

    edit(){
        this.setState({
            isEditing:false,
            editBox1:'',
            editBox2:'',
            editBox3:''
        })
    }

    delete = async(service)=>{
        const {id} = service;
        // console.log(id)
        const services = await axios.delete(`/service/delete/${id}`)
        this.setState({
            services:services.data
        })
    }

    render(){
        console.log(this.state.services)
        const {services} = this.state;
        const servArray = services.map(service =>{
            return (
                <div className="service-section-box" key={service.id}>
                        <div className="service-mapped-items">
                            <img src={service.image} alt="service"/>
                            <p>{service.service}</p>
                            <p>{service.price}</p>
                        </div>
                        
                        <div className="edit-service-input-box-container">
                            {this.state.editBox1}
                            {this.state.editBox2}
                            {this.state.editBox3}
                        </div>
                        
                        {this.props.id==this.props.match.params.userId?(
                            <div className="edit-delete-service-buttons-container">
                                {this.state.isEditing?
                                    (<button onClick={()=>{this.edit()}} className="edit-service-button">Save</button>)
                                        :(<button onClick={()=>{this.handleEditToggle()}} className="edit-service-button">Edit</button>)}
                                <button className="delete-service-button" onClick={()=>{this.delete(service)}}>Delete</button>  
                            </div>):
                            (<div className='purchase-chat-buttons-container'>
                                <button className="purchase-service-button">Purchase</button>
                                <button className="add-save-edit-button">Chat</button>
                            </div>)}
                            
                    
                </div>)
        })
        console.log(this.props)
        return(
            <div className="services-container">
                <h1 >SERVICES</h1>
                <div className="service-section-container">
                    {servArray}
                </div>
                {this.state.isAddOpened?
                (<div className="add-box-container">
                    {this.state.inputBox1}
                    {this.state.inputBox2}
                    {this.state.inputBox3}
                </div>):null
                }
                {this.state.isAdded?(
                    <button className="add-services-button" onClick={()=>this.saveAdd()}>Save</button>)
                    :
                    (<button className="add-services-button" onClick={()=>this.toggleAdd()}>Add</button>)}
            </div>


        )
    }
}

function mapStateToProps(reduxState){
    return{
        id:reduxState.id,
        viewedUserId:reduxState.viewedUserId,
        userId:reduxState.userId
    }
}

export default withRouter(connect(mapStateToProps)(ServiceList));