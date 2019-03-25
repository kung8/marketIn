import React, { Component } from 'react';
// import '../../App.css';
import {connect} from 'react-redux';
import {updateViewedUser,updateServices} from '../../ducks/userActions';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
// import { DirectConnect, IoT1ClickDevicesService } from 'aws-sdk';
import Service from './Service';
import LoadingWrapper from '../Loader/LoadingWrapper';

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            picture_name:'',
            picture_description:'',
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
            img:'',
            isLoaded:false,
            picLoaded:false
        };
    }

    componentDidMount(){
        this._isMount=true
        this.getUser();
        this.getServices();
    }

    async getUser(){
        if(this.props.match.params.userId){
            const userProfile = await axios.get('/profile/get/user/'+this.props.match.params.userId);
            this.props.updateViewedUser(userProfile.data[0])
        }
    }

    getServices=async()=>{
        const {userId} = this.props.match.params;
        const services = await axios.get(`/services/get/${userId}`)
        this.props.updateServices(services.data)
        if(this._isMount){
            this.setState({
                services:services.data,
                isLoaded:true
            })
        }

    }

    getSignedRequest = async ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    try {let response = await axios.get('/api/signs3', 
            {params: {
                'file-name': fileName,
                'file-type': file.type,
            }
        })  
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
    }  catch(err){
        alert(err)
        };
    };

    uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, picLoaded:true,image:url});
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    handleInput (prop,value){
        this.setState({
            [prop]:value
        })
    }

    toggleAdd(){
        return(
            <div className="add-box-container">
                {this.state.isAddOpened &&
                    <Dropzone
                        onDropAccepted={this.getSignedRequest}
                        style={{
                            position: 'relative',
                            width: 170,
                            height: 190,
                            borderWidth: 7,
                            marginTop: 10,
                            marginBottom:10,
                            borderColor: 'rgb(102, 102, 102)',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 28,
                        }}
                        accept="image/*"
                        multiple={false}
                        >
                        {this.state.picLoaded?<div><img style={{border:'solid black', width:200,height:200,marginTop:5}} src={this.state.image} alt="uploaded image"/></div>:<div>{this.state.isUploading ? <GridLoader /> : <p style={{textAlign:'center'}}>Drop File or Click Here</p>}</div>}
                    </Dropzone>
                }
                <input className="add-service-input-box" placeholder="Service" onChange={(e)=>{this.handleInput('service',e.target.value)}}/>
                <input className="add-service-input-box" placeholder="Price" onChange={(e)=>{this.handleInput('price',e.target.value)}}/>
            </div>
        )
    }

    saveAdd = async ()=>{
        const {price,service,image} = this.state;
        const {id} = this.props;
        if(price!==''&& service!=='' && image!==''){
            const services = await axios.post('/service/add',{price,service,image,id})
            this.props.updateServices(services.data)
            this.setState({
                services:services.data,
                isAdded:false,
                inputBox1:'',
                inputBox2:'',
                inputBox3:'',
                isAddOpened:false,
                price:'',
                image:'',
                service:'',
                img:'',
                picLoaded:false
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
                price:'',
                img:'',
                picLoaded:false
            })
        }
    }

    edit= async(service,price,image,id)=>{
        if(price !=='' && image !=='' && service !==''){
            const services = await axios.put(`/service/update/${id}`,{price,image,service})
            this.props.updateServices(services.data)
            this.setState({
                services:services.data
            })
        } else {
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
        const {id} = serv;
        const services = await axios.delete(`/service/delete/${id}`)
        this.props.updateServices(services.data)
        this.setState({
            services:services.data
        })
    }

    render() {
        const { isUploading,picLoaded,isAdded } = this.state;
        const {services} = this.state;
        const servArray = services.map(serv =>{
            return (
                <Service 
                key={serv.id}
                serv={serv}
                delete={this.delete}
                edit={this.edit}
                />
            )
                    
        })
        return (
            //if add is clicked it needs to open the 
          <div className="entire-services-section">
            <div className="services-container">
                <div className="services-header-holder">
                    <h1>SERVICES</h1>
                </div>
                <LoadingWrapper loaded={this.state.isLoaded}>
                <div className="service-section-container">
                    {servArray}
                </div>
                
                {this.state.isAdded&&
                    this.toggleAdd()
                }
                {this.props.id == this.props.match.params.userId?
                (isAdded?(
                    <button className="add-services-button" onClick={()=>this.saveAdd()}>Save</button>)
                    :
                    (<button className="add-services-button" onClick={()=>this.setState({isAddOpened:true,isAdded:true})}>Add</button>)):null}
                    </LoadingWrapper>
            </div>            
        
          </div>
        );
      }
    }

    function mapStateToProps(reduxState){
        return{
            services:reduxState.services,
            id:reduxState.id,
            viewedUserId:reduxState.viewedUserId,
        }
    }

    export default connect(mapStateToProps,{updateViewedUser,updateServices})(Services);
