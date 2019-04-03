import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';

//user means the one that is viewing somebody else's page
//normal id,firstName,lastName,imageUrl is the one being viewed

const button = {fontSize:25,width:160,height:40,background:'black',color:'white',borderRadius:'25%',marginRight:5};


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

        this.chatStarted = this.chatStarted.bind(this);
        this.startChat = this.startChat.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.updateMsg = this.updateMsg.bind(this);
    }

    componentDidMount(){
        this.setSocketListeners();
        this.startChat(this.props.id,this.props.viewedUserId);
        this.socket.on('startChat',messages=>{
            this.chatStarted(messages)
        })
        this.socket.on('updateMsg', messages => {
            this.updateMsg(messages)
        })
    }
    
    updateMsg(messages){
        this.setState({
            messages:messages,
            message:''
        })
    }

    chatStarted(messages){
        this.setState({
            messages:messages
        })
    }

    setSocketListeners = () => {
        this.socket=io();

        // this.socket.on('sendMsg',(message)=>{
        //     let messages = this.state.messages
        //     this.setState({
        //         messages,
        //         message:''
        //     })
        // })
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
        this.setState({
            chat:chatRoom,
        })
        this.socket.emit('startChat',{chatRoom,viewedUserId,id})

    }

    handleMessage(value){
        this.setState({
            message:value
        })
    }

    sendMsg=()=>{
        let date = new Date()
        let month = date.getMonth();
        let d = date.getDate();
        let wk = date.getDay();
        wk = this.formatDay(wk)
        let yr = date.getFullYear();
        month = this.formatMonth(month)
        let hr = date.getHours()
        let min = date.getMinutes()
        
        date = `${wk} ${d} ${month} ${yr}`
        let time = this.formatHour(hr,min)

        const {imageUrl} = this.props;
        this.socket.emit('sendMsg',{chat:this.state.chat,message:this.state.message,userId:this.props.id,viewedUserId:this.props.viewedUserId,date:date,time:time,imageUrl:imageUrl})
    }

    componentWillUnmount(){
        this.socket.disconnect();
    }

    formatHour=(hr,min)=>{        
        if(hr == 0 ){
            if(min<10){
                return min = `0${min}`
            }
            return hr = `12:${min} AM`
        } else if(13 < hr < 23){
            hr = hr - 12
            if(min<10){
                return min = `0${min}`
            }
            return hr = `${hr}:${min} PM` 
        } else if (0 < hr < 12 && !12){
            if(min<10){
                return min = `0${min}`
            }
            return hr = `${hr}:${min} AM` 
        } else if (hr === 12){
            if(min<10){
                return min = `0${min}`
            }
            return hr = `${hr}:${min} PM`
        }
    }

    formatDay=(wk)=>{
        switch(wk){
            case 0:
                return wk = "Sun";
            case 1:
                return wk = "Mon";
            case 2:
                return wk = "Tues";
            case 3:
                return wk = "Wed";
            case 4:
                return wk = "Thur";
            case 5:
                return wk = "Fri";
            case 6:
                return wk = "Sat";
        }
    }

    formatMonth=(month)=> {
        switch(month){
          case 0:
            return month = "Jan";
          case 1:
            return "Feb";
          case 2:
            return month = "Mar";
          case 3:
            return "Apr";
          case 4:
            return "May";
          case 5:
            return "Jun";
          case 6:
            return "Jul";
          case 7:
            return "Aug";
          case 8:
            return "Sep";
          case 9:
            return "Oct";
          case 10:
            return "Nov";
          case 11:
            return "Dec";
        }
      }

    render (){
        const {color} = this.state;
        const messages = this.state.messages.map((message)=>{
            //if time exist don't display, if the date exists already don't display again
            // let date = [];
            // return message[i].date
            
            return (
                <div style={{marginBottom:5, minHeight:40,maxWidth:300,background:message.color,display:'flex',overflow:'hidden',marginLeft:5,marginRight:5}}>
                    <img style={{borderRadius:'50%',height:30,width:30,marginTop:8,marginLeft:5,marginRight:5}} src={message.image_url}/>
                    <div style={{marginTop:5,marginBottom:5}}>
                        <p style={{textAlign:'left',fontSize:12}}>{message.date}</p>
                        <p style={{fontSize:12}}>{message.time}</p>
                        <p style={{textAlign:'left',fontSize:12,overflowWrap:"word-break",maxWidth:240}}>{message.message}</p>
                    </div>
                </div>
            )
        })

        // let first = this.props.userFirstName.toUpperCase()
        //figure out how to only display the person that you are chatting with. 
        return (
            <div style={{marginTop:85}}>
                <div style={{display:'flex',justifyContent:'center',background:'navy'}}>
                    <p style={{textAlign:'center',color:'white',fontSize:35,height:40,marginTop:0}}> Chat with {this.props.userFirstName}</p>
                </div>
                <div style={{display:'flex',flexDirection:'row',background:'silver',width:320,minHeight:300,justifyContent:'space-between'}}>
                    <div style={{background:'silver',maxHeight:300,width:310,marginLeft:5,marginRight:5,border:'black solid',overflowWrap:"break-word",overflowY:'scroll'}}> 
                        {messages}
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:5}}>
                    <input value={this.state.message} style={{height:50,width:260,border:'black solid',fontSize:35}} onChange={(e)=>this.handleMessage(e.target.value)}/>
                    <button style={button} onClick={this.sendMsg}>Send</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
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