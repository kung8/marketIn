import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { clearUser, updateUser, updateViewedUser } from '../../ducks/userActions';
import Education from './Education/Education';
import Work from './Work/Work';
import Skills from './Skills/Skills';
import Languages from './Languages/Languages';
import Projects from './Projects/Projects';
import LoadingWrapper from '../Loader/LoadingWrapper';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            imageUrl: this.props.imageUrl,
            isEditing: false,
            isLoaded: false,
            isUploading:false, //this is for the picture
            picLoaded:false,
            picEdit:false,
            isEditBoxOpened:false
        }
    }

    componentDidMount() {
        this._isMount = true;
        this.getUser();
        this.checkUser();
    }

    async checkUser() {
        //do a get call to be able to find their information from the backend and restore it in the reduxState...
        if (!this.props.id) {
            let user = await axios.get('/auth/current')
            this.props.updateUser(user.data)
        } else {

        }
    }

    async getUser() {
        // console.log('hit!',this.props.match.params.userId)
        if (this._isMount) {
            if (this.props.match.params.userId) {
                const userProfile = await axios.get('/profile/get/user/' + this.props.match.params.userId);
                // console.log(7777,userProfile.data);
                this.props.updateViewedUser(userProfile.data[0])
                this.setState({
                    isLoaded: true
                })
            }
        }
    }

    logout = async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/');
    }

    handleInput(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    createEditBoxes() {
        return (
            <div>
                {this.state.picEdit?
                <Dropzone
                        onDropAccepted={this.getSignedRequest}
                        style={{
                            position: 'relative',
                            width: 200,
                            height: 200,
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
                        {this.state.picLoaded?<div>{this.state.img}</div>:<div>{this.state.isUploading ? <GridLoader /> : <p style={{textAlign:'center'}}>Drop File or Click Here</p>}</div>}
                    </Dropzone>
                    :
                    <div style={{position:'relative'}}>
                        <img style={{marginTop:10,height:200,width:180,border:'solid black'}} src={this.state.imageUrl}/>
                        {!this.state.picEdit && <i style={{position:'absolute',top:13,left:45,fontSize:30}}class="fas fa-pencil-alt" onClick={()=>this.setState({picEdit:true})}></i>}
                    </div>
                }
                <input value={this.state.firstName} className="edit-profile-input-boxes" placeholder="First Name" onChange={(e) => this.handleInput('firstName', e.target.value)} />
                <input value={this.state.lastName} className="edit-profile-input-boxes" placeholder="Last Name" onChange={(e) => this.handleInput('lastName', e.target.value)} />
                <input value={this.state.email} className="edit-profile-input-boxes" placeholder="Email" onChange={(e) => this.handleInput('email', e.target.value)} />
                {/* <input value={this.state.imageUrl} className="edit-profile-input-boxes" placeholder="Profile Pic" onChange={(e) => this.handleInput('imageUrl', e.target.value)} /> */}
            </div>
        )
    }

    async editProfile() {
        const { firstName, lastName, email, imageUrl } = this.state;
        const { id } = this.props;
        if (firstName !== '' && lastName !== '' && email !== '' && imageUrl !== '') {
            // console.log(id,firstName,lastName,email,imageUrl)
            //need to create a call to edit the user's email, first and last name, and picture
            let userProfile = await axios.put('/profile/edit/user', { firstName, lastName, email, imageUrl, id });
            // console.log(userProfile)
            if (this._isMount) {
                this.props.updateUser(userProfile.data[0])
                this.setState({
                    isEditing: false,
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    email: this.props.email,
                    imageUrl: this.props.imageUrl,
                    id: this.props.id,
                    isEditBoxOpened:false
                })
            }
        }
        this.setState({
            isEditing: false,
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
            // console.log(err);
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
                let imgUrl = response.config.url;
                imgUrl = imgUrl.substring(0,imgUrl.indexOf('?'))
            //   console.log(77777,response,response.config.url,imgUrl)
            this.setState({ isUploading: false, picLoaded:true,img:<img style={{width:200,height:200}} src={`${imgUrl}`} alt="uploaded image"/>,image:imgUrl});
            // console.log(888,this.state.img,this.state.url)

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

    //need to create some input boxes for edit but only want those to show if I press edit. 

    render() {
        // console.log(this.props)
        //if a user session id == user then you can edit that profile but this is already a way to check session

        return (
            <div className="profile-container">
                <LoadingWrapper loaded={this.state.isLoaded}>
                    <div className="profile-basic-info-container">
                        {this.state.isEditBoxOpened?
                            <div className="edit-profile-input-button-container">
                                {this.state.isEditing &&
                                this.createEditBoxes()
                                }   
                            </div>
                            :
                            <div>
                                <img className="profile-picture" src={this.props.userImageUrl} alt="Profile Pic" />
                                <div style={{ width: '100%' }}>
                                    <h1>{this.props.userFirstName} {this.props.userLastName}</h1>
                                    <h1><a style={{ textDecoration: 'none', color: 'black' }} href={`mailto:${this.props.userEmail}`}>{this.props.userEmail}</a></h1>
                                </div>
                            </div>
                        }
                        <div className="edit-profile-input-button-container">
  
                            {this.props.match.params.userId != this.props.id ? (null) : (this.state.isEditing ? (<button onClick={() => this.editProfile()}>Save</button>) : (<button onClick={() => this.setState({isEditing:true,isEditBoxOpened:true})}>Edit</button>))}
                        </div>
                    </div>
                    

                </LoadingWrapper>
                <div className="section-container">
                    <Education />
                </div>
                <div className="section-container">
                    <Work />
                </div>
                <div className="section-container">
                    <Skills />
                </div>
                <div className="section-container">
                    <Languages />
                </div>
                <div className="section-container">
                    <Projects />
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    // console.log(222,reduxState)
    return {
        id: reduxState.id,
        firstName: reduxState.firstName,
        lastName: reduxState.lastName,
        email: reduxState.email,
        imageUrl: reduxState.imageUrl,
        userFirstName: reduxState.userFirstName,
        userLastName: reduxState.userLastName,
        userEmail: reduxState.userEmail,
        userImageUrl: reduxState.userImageUrl,
        viewedUserId: reduxState.viewedUserId,
        education: reduxState.education,
    }
}

export default withRouter(connect(mapStateToProps, { clearUser, updateUser, updateViewedUser })(Profile))