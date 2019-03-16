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
            isNavBarOpened:false
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
                navBar:250
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
    render(){
        return(
            <div className="header-container">
                <div className="header">
                    <button className="marketin-logo" onClick={()=>{this.toggleNavBar()}}>MI</button>
                </div>
                <h1 className="marketin-name">MarketIn</h1>
                    {this.props.id?
                        (<div className="sidebar-container" style={{width:this.state.navBar}}>
                                <p style={{color:'white'}}>Signed in as:</p>
                                <Link to={`/profile/${this.props.id}`} onClick={()=>this.toggleNavBar()}>{this.props.firstName} {this.props.lastName}</Link>
                                
                                <p style={{color:'white'}}>Viewing</p>
                                <Link to={`/profile/${this.props.viewedUserId}`} onClick={()=>this.toggleNavBar()}>{this.props.userFirstName} {this.props.userLastName}</Link>

                                <Link to={`/services/${this.props.viewedUserId}`} onClick={()=>this.toggleNavBar()}>Services</Link>
                                <a href={`mailto:${this.props.userEmail}`} onClick={()=>this.toggleNavBar()}>Contact</a>
                                <span style={{color: 'white'}} onClick={this.logout}>Logout</span>
                                {/* <Link to="/"><span style={{color: 'white'}} onClick={this.logout}>Logout</span></Link> */}
                        </div>
                        ) : (<div className="sidebar-container" style={{width:this.state.navBar}}>
                                <Link to='/' onClick={()=>this.toggleNavBar()}>Login</Link>
                                <a href="mailto:ung.kevin78@gmail.com" onClick={()=>this.toggleNavBar()}>Contact</a>
                            </div>
                        )
                    }
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