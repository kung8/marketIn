import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/userActions';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
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
        await this.props.clearUser();
        await this.props.history.push('/'); 

    }
    render(){
        // console.log(this.props)
        return(
            <div className="header-container">
                <div className="header">
                    <button className="marketin-logo" onClick={()=>{this.toggleNavBar()}}>MI</button>
                </div>
                <h1 className="marketin-name">MarketIn</h1>
                    {this.props.id?
                            (
                                <div className="sidebar-container" style={{width:this.state.navBar}}>
                                    <a style={{color:'white'}}>{this.props.firstName} {this.props.lastName}</a>
                                    <a href="#/services">Services</a>
                                    <a href={`mailto:${this.props.userEmail}`}>Contact</a>
                                    <a href="#/" onClick={this.logout}>Logout</a>
                                </div>
                            
                            ):(
                                <div className="sidebar-container" style={{width:this.state.navBar}}>
                                    <a href="mailto:ung.kevin78@gmail.com" style={{fontSize:"24px",color:"white",textDecoration:"none"}}>Contact</a>
                                </div>
                            )}
                {/* {this.props.id?
                    (<div className="logout-button-container">
                        <Link to='/'><button className="logout-button" onClick={this.logout}>Logout</button></Link>
                    </div>):null
                } */}
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
        lastName:reduxState.lastName
    }
}

export default withRouter(connect(mapStateToProps,{clearUser})(Header))