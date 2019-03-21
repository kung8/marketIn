import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';

//user means the one that is viewing somebody else's page
//normal id,firstName,lastName,imageUrl is the one being viewed

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            userTyping:false,
            userNameTyping:'',
            message:'',
            messages:[],
            chat:'',
            date:''
        }
    }

    componentDidMount(){
        this.setSocketListeners();
        this.startChat();
    }

    setSocketListeners = () => {
        this.socket=io();
        // console.log('hit!');

        this.socket.on('sendMsg',(message)=>{
            // console.log(111,message,typeof message)
            let messages = this.state.messages
            // console.log(222,messages);
            messages.push(message);
            this.setState({
                messages,
                message:''
            })
            // console.log(this.state.messages)
        })
    }
    
    startChat(me,you){
        this.socket.emit('endChat',this.state.chat) //this is to make sure that you are not sending the msg to somebody else...awkward
        const {viewedUserId,id} = this.props;
        me = id;
        you = viewedUserId;
        me = parseInt(me);
        you = parseInt(you);
        let userA 
        let userZ 
        if(me > you){
            userA = me;
            userZ = you; 
        } else {
            userA = you;
            userZ = me;
        }

        const chatRoom = userA + '-' + userZ;
        // console.log(userA,userZ,chatRoom);
        this.setState({
            chat:chatRoom
        })
        this.socket.emit('startChat',chatRoom)

    }

    handleMessage(value){
        this.setState({
            message:value
        })
    }

    sendMsg=()=>{
        this.socket.emit('sendMsg',{chat:this.state.chat,message:this.state.message,name:this.props.firstName})
    }

    componentWillUnmount(){
        this.socket.disconnect();
    }

    render (){
        const messages = this.state.messages.map(message=>{
            return (
                <div>

                    <p style={{textAlign:'left'}}>{message.name}</p>
                    <p style={{textAlign:'left'}}>{message.date}</p>
                    <p style={{textAlign:'left'}}>{message.message}</p>
                </div>
            )
        })

        let first = this.props.userFirstName.toUpperCase()
        //figure out how to only display the person that you are chatting with. 
        return (
            <div style={{marginTop:85}}>
                <div style={{display:'flex',justifyContent:'center',background:'navy'}}>
                    <h1 style={{textAlign:'center',color:'white',fontSize:35,height:40,marginTop:0}}> {first} CHAT</h1>
                </div>
                <div style={{display:'flex',flexDirection:'row',background:'silver',width:320,minHeight:300,justifyContent:'space-between'}}>
                    {/* {chat} */}
                    <div>
                        {/* <p>{this.props.userFirstName}{this.props.userLastName}</p> */}
                        <img src={this.props.userImageUrl} alt="Person you're chatting with" style={{width:80,height:120}}/>
                    </div>
                    <div> 
                        {messages}
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:5}}>
                    <input value={this.state.message} style={{height:50,width:260,border:'black solid',fontSize:35}} onChange={(e)=>this.handleMessage(e.target.value)}/>
                    <button className="add-contact-button" onClick={this.sendMsg}>Send</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    console.log(reduxState)
    const {id,firstName,lastName,imageUrl,viewedUserId,userFirstName,userLastName,userImageUrl,} = reduxState
    return{
        id,
        firstName,
        lastName,
        imageUrl,
        viewedUserId,
        userFirstName,
        userLastName,
        userImageUrl
    }
}

export default connect(mapStateToProps)(Chat)