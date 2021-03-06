import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
            imageUrl:this.props.imageUrl,
            isEditing: false,
            isLoaded: false,
            isLoaded2:true,
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
        } 
    }

    async getUser() {
            if (this.props.match.params.userId) {
                const userProfile = await axios.get('/profile/get/user/' + this.props.match.params.userId);
                this.props.updateViewedUser(userProfile.data[0])
                this.setState({
                    isLoaded: true,
                    firstName: userProfile.data[0].first_name,
                    lastName: userProfile.data[0].last_name,
                    email: userProfile.data[0].email,
                    imageUrl: userProfile.data[0].image_url,
                    id: userProfile.data[0].id,
                })
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
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:320}}>
                {this.state.picEdit?
                <Dropzone
                        onDropAccepted={this.getSignedRequest}
                        style={{
                            position: 'relative',
                            width: 150,
                            height: 180,
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
                        multiple={true}
                    >
                        {this.state.picLoaded?
                        <div>
                            <img style={{marginTop:10,marginBottom:10,height:200,width:180,border:'solid black'}} src={this.state.imageUrl}/>
                        </div>
                        :
                        <div>
                            {this.state.isUploading ? 
                                <GridLoader /> 
                                :
                                <p style={{textAlign:'center'}}>Drop File or Click Here</p>}
                        </div>}
                            
                    </Dropzone>
                    :
                    <div style={{position:'relative'}}>
                        <img style={{marginTop:10,height:200,width:180,border:'solid black'}} src={this.state.imageUrl}/>
                        {!this.state.picEdit && <div style={{position:'absolute',top:13,right:5,height:30,width:30,background:'white'}}><i style={{fontSize:30}}class="fas fa-pencil-alt" onClick={()=>this.setState({picEdit:true})}></i></div>}
                    </div>
                }
                <input value={this.state.firstName} className="edit-profile-input-boxes" placeholder="First Name" onChange={(e) => this.handleInput('firstName', e.target.value)} />
                <input value={this.state.lastName} className="edit-profile-input-boxes" placeholder="Last Name" onChange={(e) => this.handleInput('lastName', e.target.value)} />
                <input value={this.state.email} className="edit-profile-input-boxes" placeholder="Email" onChange={(e) => this.handleInput('email', e.target.value)} />
            </div>
        )
    }


    componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props){
            this.getUser();
        }
    }

    async editProfile() {
        const { firstName, lastName, email, imageUrl } = this.state;
        const { id } = this.props;
        if (firstName !== '' && lastName !== '' && email !== '' && imageUrl !== '') {

            let userProfile = await axios.put('/profile/edit/user', { firstName, lastName, email, imageUrl, id });
                this.props.updateUser(userProfile.data[0])
               this.setState({
                    isEditing: false,
                    firstName: userProfile.data[0].first_name,
                    lastName: userProfile.data[0].last_name,
                    email: userProfile.data[0].email,
                    imageUrl: userProfile.data[0].image_url,
                    id: userProfile.data[0].id,
                    isEditBoxOpened:false,
                    picEdit:false
                })
        } else {
            return alert('Please fill out all boxes')
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
            this.setState({ isUploading: false, picLoaded:true,imageUrl:url});

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
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',overflow:'hide'}}>
                                <img className="profile-picture" src={this.props.userImageUrl} alt="Profile Pic" />
                                <div style={{maxWidth:320}}>
                                    <h1>{this.props.userFirstName} {this.props.userLastName}</h1>
                                    <h1 style={{maxWidth:320,overflowWrap:"break-word"}}><a style={{ textDecoration: 'none', color: 'black' }} href={`mailto:${this.props.userEmail}`}>{this.props.userEmail}</a></h1>
                                </div>
                            </div>
                        }
                        <div className="edit-delete-button-container">
  
                            {this.props.match.params.userId != this.props.id ? (null) : (this.state.isEditing ? (<button className="add-save-edit-button" onClick={() => this.editProfile()}>Save</button>) : (<button className="add-save-edit-button" onClick={() => this.setState({isEditing:true,isEditBoxOpened:true})}>Edit</button>))}
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

export default connect(mapStateToProps, { clearUser, updateUser, updateViewedUser })(Profile)