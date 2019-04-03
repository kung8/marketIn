import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/userActions';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';
// import '../../App.css'

class Header extends Component {
    constructor(){
        super();
        this.state={
            navBar:0,
            isNavBarOpened:false,
            winWidth:0,
            headerBar:false
        }
    }
    
    componentDidMount(){
        this.resize()   
    }
    
    // windowResize(){
    //         this.setState({
    //             winWidth:window.screen.width
    //         })
    //         console.log(this.state.winWidth)
    // }

    resize(prevState,currState){
        console.log('hit')
        currState = window.screen.width;
        prevState = this.state.winWidth;
        if(prevState !== currState){
            this.setState({
                winWidth:window.screen.width
            })
        }
    }

    toggleNavBar(){
        const {isNavBarOpened} = this.state;
        if(isNavBarOpened===false){
            this.setState({
                isNavBarOpened:true,
                navBar:0
            })
        } else {
            this.setState({
                isNavBarOpened:false,
                navBar:270
            })
        }
    }

    logout = async () => {
        await axios.post('/auth/logout');
        this.setState({
            isNavBarOpened:false,
            navBar:0
        })
        this.props.clearUser();
        this.props.history.push('/'); 

    }

    handleToggle=()=>{
        console.log('hit!')
        console.log(this.state.headerBar)
        this.setState({
            headerBar:!this.state.headerBar
        })
    }

    toggleHeaderBar=()=>{
        if(this.state.headerBar){
            console.log(this.props.id)
            if(this.props.id && this.state.headerBar > 700){
                return(
                    <div>
                        <Link to={`/profile/${this.props.id}`}>{this.props.firstName} {this.props.lastName}</Link>
                        <Link to={`/payments/${this.props.id}`} onClick={this.handleToggle}>Payments</Link>
                        <Link to={`/services/${this.props.viewedUserId}`} onClick={this.handleToggle}>Services</Link>
                        <Link to={`/contact/${this.props.viewedUserId}`} onClick={this.handleToggle}>Contact</Link>
                        <span onClick={this.logout}>Logout</span>
                    </div>
                )
    
            } else {
                console.log('should')
                return(
                    <div className="header-bar">
                        <Link to='/about' onClick={this.handleToggle}><h1>About</h1></Link>
                        <Link to='/profile/70' onClick={this.handleToggle}><h1>Dev</h1></Link>
                        <Link to={`/services/70`} onClick={this.handleToggle}><h1>Services</h1></Link>
                        <Link to={`/contact/70`} onClick={this.handleToggle}><h1>Contact</h1></Link>
                        <Link to='/' onClick={this.handleToggle}><h1>Login</h1></Link>
                    </div>
                )
            }

        }
    }

    render(){
        const {id} = this.props;
        this.resize()
        console.log(this.state.winWidth)
        const {winWidth} = this.state;
        return (<div>

            {(winWidth < 700) ? 
            <div className="header-container">
                <div className="header">
                    <button style={{background:'unset'}} className="marketin-logo" onClick={()=>{this.toggleNavBar()}}>MI</button>
                </div>
                <h1 className="marketin-name">MarketIn</h1>
                    {this.props.id?
                        (<div className="sidebar-container" style={{width:this.state.navBar}}>
                                <p style={{color:'white',marginLeft:10,marginTop:10}}>Signed in as:</p>
                                <Link to={`/profile/${this.props.id}`} onClick={()=>this.toggleNavBar()}>{this.props.firstName} {this.props.lastName}</Link>
                                <Link to={`/payments/${id}`} onClick={()=>this.toggleNavBar()}>Payments</Link>
                                <Link to='/search' onClick={()=>this.toggleNavBar()}>Search</Link>
                                <p style={{color:'white',marginLeft:10,marginTop:10}}>Viewing:</p>
                                <Link to={`/profile/${this.props.viewedUserId}`} onClick={()=>this.toggleNavBar()}>{this.props.userFirstName} {this.props.userLastName}</Link>
                                <Link to={`/services/${this.props.viewedUserId}`} onClick={()=>this.toggleNavBar()}>Services</Link>
                                <Link to={`/contact/${this.props.viewedUserId}`} onClick={()=>this.toggleNavBar()}>Contact</Link>
                                <span style={{color: 'white'}} onClick={this.logout}>Logout</span>
                        </div>
                        ) : (<div className="sidebar-container" style={{width:this.state.navBar}}>
                                <Link to='/' onClick={()=>this.toggleNavBar()}>Login</Link>
                                <Link to='/search' onClick={()=>this.toggleNavBar()}>Search</Link>
                                <Link to='/about' style={{color:'white'}} onClick={()=>this.toggleNavBar()}>About MarketIn</Link>
                                <Link to='/profile/70' onClick={()=>this.toggleNavBar()}>About the Dev</Link>
                                <Link to={`/services/70`} onClick={()=>this.toggleNavBar()}>Dev Services</Link>
                                <Link to={`/contact/70`} onClick={()=>this.toggleNavBar()}>Contact the Dev</Link> 
                            </div>
                        )
                    }
            </div> 
            :
            <div className="header-container">
                <div className="header" style={{display:'flex', justifyContent:'space-between',width:'96%'}}>
                    <h1 className="marketin-name">MarketIn</h1>
                    <Link to='/search'><i style={{color:'white',fontSize:35}} className="fas fa-search"/></Link>
                    <i style={{color:'white', fontSize:35}} class="fas fa-bars" onClick={this.handleToggle}></i> 
                    {this.state.headerBar && this.toggleHeaderBar()}
                </div>
            </div>}
        </div> 

        
        )
    }
}

function mapStateToProps(reduxState){
    return{
        id:reduxState.id,
        userEmail:reduxState.userEmail,
        userFirstName:reduxState.userFirstName,
        userLastName:reduxState.userLastName,
        firstName:reduxState.firstName,
        lastName:reduxState.lastName,
        viewedUserId:reduxState.viewedUserId
    }
}

export default withRouter(connect(mapStateToProps,{clearUser})(Header))