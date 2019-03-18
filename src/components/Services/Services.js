import React, { Component } from 'react';
// import '../../App.css';
import {connect} from 'react-redux';
import {updateViewedUser} from '../../ducks/userActions';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { DirectConnect, IoT1ClickDevicesService } from 'aws-sdk';
import ServiceList from './ServiceList';

class Services extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: 'http://via.placeholder.com/200x200',
      picture_name:'',
      picture_description:'',
      house:''
    };
  }

  componentDidMount(){
    // this.isMount=true;
    this.getUser();
}

async getUser(){
    // console.log('hit!',this.props.match.params.userId)
    // if(this._isMount){
        if(this.props.match.params.userId){
            const userProfile = await axios.get('/profile/get/user/'+this.props.match.params.userId);
            // console.log(7777,userProfile.data);
            this.props.updateViewedUser(userProfile.data[0])
            // this.setState({
            //     count:this.state.count++
            // })
        // }
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
        console.log(err);
      };
  };

  uploadFile = async (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    // try{
        let response = await axios.put(signedRequest, file, options)
    this.setState({ isUploading: false, url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
    } 
    // catch(err){
    //     this.setState({
    //       isUploading: false,
    //     });
    //     if (err.response.status === 403) {
    //       alert(
    //         `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
    //           err.stack
    //         }`
    //       );
    //     } else {
    //       alert(`ERROR: ${err.status}\n ${err.stack}`);
    //     }
    //   });
//   };

    // handleInput (value){
    //     this.setState({
    //         house:value
    //     })
    //     console.log(value)
    // }

    // handleClick (){
    //     if(this.state.house === ''){
    //         // axios.get('https://www.potterapi.com/v1/characters','$2a$10$MQnGphpJPwYsUlYiSWt8b.gxxCZ/9uZiyoEJKL4yAnYkAn4ax8h22'
    //         axios.get(`http://hp-api.herokuapp.com/api/characters/`
    //         ).then(character =>{
    //             let char = character.data[Math.floor(Math.random()*character.data.length)]
    //             console.log(char.image)
    //         })
    //     } else {
    //         console.log('it did not work')
    //     }
    // }

  render() {
    const { url, isUploading } = this.state;
    return (
      <div 
        style={{marginTop:90,width:320,background:'lightblue',display:'flex',flexDirection:'column',alignItems:'center'}}
        >
        {/* <p>Upload</p> */}
        {/* <input value={this.state.house} onChange={(e)=>this.handleInput(e.target.value)}/>
        <button onClick={()=>this.handleClick()}>House Sorter</button> */}
        {/* <p>{url}</p> */}
        <img src={url} alt="" width="200px" />
        <Dropzone onDropAccepted={this.getSignedRequest} >
            {({getRootProps, getInputProps}) => (
                // <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} style={{
                            // position: 'relative',
                            width: 200,
                            height: 200,
                            borderWidth: 7,
                            // marginTop: 100,
                            borderColor: 'rgb(102, 102, 102)',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection:'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 12,
                        }}/>
                        {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
                    </div>
                // </section>
  )}
</Dropzone>
<ServiceList/>

        {/* <div
          onDropAccepted={this.getSignedRequest}
          style={{
            position: 'relative',
            width: 200,
            height: 200,
            borderWidth: 7,
            marginTop: 100,
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
        >  */}
        {/* {()=>{
        return (<div> */}
            {/* {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>} */}
            {/* </div>
            )}} */}
        {/* </div> */}
      </div>
    );
  }
}

export default connect('',{updateViewedUser})(Services);
