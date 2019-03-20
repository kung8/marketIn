import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateServices} from '../../ducks/userActions';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

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
            services:this.props.services,
            isEditOpened:false,
            isLoaded:false,
            picLoaded:false
        }
    }

    componentDidMount(){
        this._isMount=true
    }

    handleInput (prop,value){
        this.setState({
            [prop]:value
        })
        console.log(prop,value)
    }

    handleEditToggle(serv){
        console.log(444,this.state.services,this.props.services)

        this.setState({
            isEditing:true,
            isEditOpened:true,
            editBox1:<input placeholder="Service" onChange={(e)=>this.handleInput('service',e.target.value)}/>,
            editBox2:<input placeholder="Price" onChange={(e)=>this.handleInput('price',e.target.value)}/>,
            image:serv.image
            // editBox3:<input placeholder="Image" onChange={(e)=>this.handleInput('image',e.target.value)}/>

        })
        console.log(999,this.state)
    }

    edit= async (serv)=>{
        const {price,image,service} = this.state;
        const {id} = serv;
        console.log(55,service,price,image,id);
        this.props.edit(service,price,image,id)
                this.setState({
                    isEditing:false,
                    isEditOpened:false,
                    editBox1:'',
                    editBox2:'',
                    editBox3:'',
                    service:'',
                    image:'',
                    price:''
                })
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
            console.log(err);
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
              let imgUrl = response.config.url;
              imgUrl = imgUrl.substring(0,imgUrl.indexOf('?'))
              console.log(77777,response,response.config.url,imgUrl)
            this.setState({ isUploading: false, url,picLoaded:true,img:<img style={{width:200,height:200}} src={`${imgUrl}`} alt="uploaded image"/>,image:imgUrl});
            console.log(888,this.state.img,this.state.url)

            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
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


    render() {
        const {serv} = this.props;
        const {isLoaded,picLoaded,isEditOpened} = this.state;
        return (
        <div className="service-section-box">
                <div className="service-mapped-items">
                    <img src={serv.image} alt="service"/>
                    <p>{serv.service}</p>
                    <p>{serv.price}</p>
                </div>
                {isEditOpened?
                <div className="edit-service-input-box-container">
                <Dropzone
                    onDropAccepted={this.getSignedRequest}
                    style={{
                        position: 'relative',
                        width: 200,
                        height: 200,
                        borderWidth: 7,
                        marginTop: 10,
                        marginBottom:10,
                        borderColor: 'navy',
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
                    {picLoaded?<div>{this.state.img}</div>:<div>{isLoaded ? <GridLoader /> : <p style={{textAlign:'center'}}>Drop File or Click Here</p>}</div>}
                    </Dropzone>
                    {this.state.editBox1}
                    {this.state.editBox2}
                    {this.state.editBox3}
                </div>:null
                } 
                
                {this.props.id==this.props.match.params.userId?(
                    <div className="edit-delete-service-buttons-container">
                        {this.state.isEditing?
                            (<button onClick={()=>this.edit(serv)} className="edit-service-button">Save</button>)
                                :(<button onClick={()=>{this.handleEditToggle(serv)}} className="edit-service-button">Edit</button>)}
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