import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Service from './Service';

class ServiceList extends Component {
    constructor(props){
        super(props);
        this.state={
            image:'',
            service:'',
            userId:'',
            price:'',
            services:this.props.services,
            isAdded:false,
            inputBox1:'',
            inputBox2:'',
            inputBox3:'',
            isAddOpened:false,
        }

    }
    
    componentDidMount(){
        this.getService()
    }

    getService=async()=>{
        const {userId} = this.props.match.params;
        const services = await axios.get(`/services/get/${userId}`)
        // console.log(services.data);
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
                isAddOpened:false,
                price:'',
                image:'',
                service:''
            })
        } else {
            this.setState({
                isAdded:false,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                isAddOpened:false,
                image:'',
                service:'',
                price:''
            })
        }
    }

    edit= async(service,price,image,id)=>{
        // console.log(77,service,price,image,id)
        if(price !=='' && image !=='' && service !==''){
            // console.log('hit!')
            const services = await axios.put(`/service/update/${id}`,{price,image,service})
            // console.log(services)
            this.setState({
                services:services.data
            })
        } else {
            // console.log('not making it in!')
            this.setState({
                isEditing:false,
                editBox1:'',
                editBox2:'',
                editBox3:'',
                service:'',
                image:'',
                price:''
            })
        }
    }

    delete = async(serv)=>{
        console.log(serv)
        const {id} = serv;
        // console.log(id)
        const services = await axios.delete(`/service/delete/${id}`)
        this.setState({
            services:services.data
        })
    }

    render(){
        console.log(this.props)
        const {services} = this.state;
        const servArray = services.map(serv =>{
            return (

                // <div className="service-section-box">
                //         <div className="service-mapped-items">
                //             <img src={serv.image} alt="service"/>
                //             <p>{serv.service}</p>
                //             <p>{serv.price}</p>
                //         </div>
                        
                //         <div className="edit-service-input-box-container">
                //             {this.state.editBox1}
                //             {this.state.editBox2}
                //             {this.state.editBox3}
                //         </div>
                        
                //         {this.props.id==this.props.match.params.userId?(
                //             <div className="edit-delete-service-buttons-container">
                //                 {this.state.isEditing?
                //                     (<button onClick={()=>{this.edit(serv)}} className="edit-service-button">Save</button>)
                //                         :(<button onClick={()=>{this.handleEditToggle()}} className="edit-service-button">Edit</button>)}
                //                 <button className="delete-service-button" onClick={()=>{this.delete(serv)}}>Delete</button>  
                //             </div>):
                //             (<div className='purchase-chat-buttons-container'>
                //                 <button className="purchase-service-button">Purchase</button>
                //                 <button className="add-save-edit-button">Chat</button>
                //             </div>)}
                // </div>)
            
                        <Service 
                        key={serv.id}
                        serv={serv}
                        delete={this.delete}
                        edit={this.edit}
                        // handleEditToggle={this.handleEditToggle}
                        />)
                    
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
        services:reduxState.services
    }
}

export default withRouter(connect(mapStateToProps)(ServiceList));