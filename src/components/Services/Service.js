import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateServices,collectService} from '../../ducks/userActions';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';
import {Link} from 'react-router-dom';

class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false,
            isEditOpened:false,
            userId:'',
            pic:'',
            image:'',
            service:'',
            price:this.props.price,
            services:this.props.services,
            isLoaded:false,
            picLoaded:false,
            picEdit:false,
        }
    }

    componentDidMount(){
        this._isMount=true
    }

    handleInput (prop,value){
        this.setState({
            [prop]:value
        })
        // console.log(prop,value)
    }

    handleEditToggle(serv){
        return(
            <div className="edit-service-input-box-container">
                {this.state.picEdit?
                <Dropzone
                    onDropAccepted={this.getSignedRequest}
                    style={{
                        position: 'relative',
                        width: 170,
                        height: 190,
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
                    {this.state.picLoaded?
                        <div>
                            {this.state.isLoaded ? <GridLoader /> : <p style={{textAlign:'center'}}>Drop File or Click Here</p>}
                        </div>
                        :
                        <div>
                            <img style={{marginTop:10,height:200,width:180,border:'solid black'}} src={this.state.image}/>
                        </div>
                        }
                </Dropzone>:
                    <div style={{position:'relative'}}>
                        <img style={{marginTop:10,height:200,width:180,border:'solid black'}} src={this.state.image}/>
                        {!this.state.picEdit && <i style={{position:'absolute',top:10,left:0,fontSize:30}}class="fas fa-pencil-alt" onClick={()=>this.setState({picEdit:true})}></i>}
                    </div>
                }
                
                <input value={this.state.service} placeholder="Service" onChange={(e)=>this.handleInput('service',e.target.value)}/>
                <input value={this.state.price} placeholder="Price" onChange={(e)=>this.handleInput('price',e.target.value)}/>
            </div>
        )
    }

    edit= async (serv)=>{
        const {price,image,service} = this.state;
        const {id} = serv;
        // console.log(55,service,price,image,id);
        this.props.edit(service,price,image,id)
                this.setState({
                    isEditing:false,
                    isEditOpened:false,
                    service:'',
                    image:'',
                    price:'',
                    picEdit:false
                })
    }

    getSignedRequest = async ([file]) => {
        this.setState({isLoaded:true });
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
                alert(err);
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
            //   console.log(77777,response,response.config.url,imgUrl)
            this.setState({picLoaded:true,image:imgUrl,picLoaded:false,isLoaded:false});
            // console.log(888,this.state.img,this.state.url)

            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
            this.setState({
              isloaded:false
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

    handlePurchase(serv){
        console.log(222,serv)
        const {viewedUserId} = this.props;
        this.props.collectService(serv);
        this.props.history.push(`/purchase/${viewedUserId}`)
    }

    render() {
        const {serv,viewedUserId} = this.props;
        return (
            <div className="service-section-box">
                    {this.state.isEditOpened?
                        <div className="edit-service-input-box-container">
                            <div>
                                {this.state.isEditing && 
                                    this.handleEditToggle()
                                }
                            </div>
                        </div>
                        :
                        <div className="service-mapped-items">
                            <img src={serv.image} alt="service"/>
                            <p>{serv.service}</p>
                            <p>{serv.price}</p>
                        </div>
                    }    
                    
                    {this.props.id==this.props.match.params.userId?(
                        <div className="edit-delete-service-buttons-container">
                            {this.state.isEditing?
                                (<button onClick={()=>this.edit(serv)} className="edit-service-button">Save</button>)
                                    :(<button onClick={()=>this.setState({isEditing:true,isEditOpened:true,service:serv.service,price:serv.price,image:serv.image,picLoaded:true})} className="edit-service-button">Edit</button>)}
                            <button className="delete-service-button" onClick={()=>{this.props.delete(serv)}}>Delete</button>  
                        </div>):
                        (<div className='purchase-chat-buttons-container'>
                            <button className="purchase-service-button" onClick={()=>this.handlePurchase(serv)}>Purchase</button>
                            {/* <Link to='/purchase'><button className="purchase-service-button" onClick={()=>this.handlePurchase(serv)}>Purchase</button></Link> */}
                            <Link to={`/chat/${viewedUserId}`}><button className="add-save-edit-button">Chat</button></Link>
                        </div>)}
            </div>
        )
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

export default withRouter(connect(mapStateToProps, {updateServices,collectService})(Service));