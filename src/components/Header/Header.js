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
    render(){
        const {id} = this.props;
        return(
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
                                {/* <a href={`mailto:${this.props.userEmail}`} onClick={()=>this.toggleNavBar()}>Contact</a> */}
                                <Link to={`/contact/${this.props.viewedUserId}`} onClick={()=>this.toggleNavBar()}>Contact</Link>
                                <span style={{color: 'white'}} onClick={this.logout}>Logout</span>
                                {/* <Link to="/"><span style={{color: 'white'}} onClick={this.logout}>Logout</span></Link> */}
                        </div>
                        ) : (<div className="sidebar-container" style={{width:this.state.navBar}}>
                                <Link to='/' onClick={()=>this.toggleNavBar()}>Login</Link>
                                <Link to='/search' onClick={()=>this.toggleNavBar()}>Search</Link>
                                <Link to='/about' style={{color:'white'}} onClick={()=>this.toggleNavBar()}>About MarketIn</Link>
                                <Link to='/profile/70'onClick={()=>this.toggleNavBar()}>About the Dev</Link>
                                <Link to={`/services/70`} onClick={()=>this.toggleNavBar()}>Dev Services</Link>
                                <Link to={`/contact/70`} onClick={()=>this.toggleNavBar()}>Contact the Dev</Link> 
                                {/* <a href="mailto:ung.kevin78@gmail.com" onClick={()=>this.toggleNavBar()}>Contact</a> */}
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