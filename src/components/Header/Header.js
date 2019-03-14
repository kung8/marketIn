import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/userActions';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
                navBar:200
            })
        }
    }

    logout =async () => {
        await axios.post('/auth/logout');
        this.setState({
            isNavBarOpened:false,
            navBar:0
        })
        this.props.clearUser();
        // this.props.history.push('/'); 

    }
    render(){
        console.log(this.props)
        return(
            <div className="header-container">
                <div className="header">
                    <a className="marketin-logo" onClick={()=>{this.toggleNavBar()}}>MI</a>
                </div>
                <h1 className="marketin-name">MarketIn</h1>
                    {this.props.id?
                            (
                                <div className="sidebar-container" style={{width:this.state.navBar}}>
                                    <a href="#/" onClick={this.logout}>Logout</a>
                                    <a>Education</a>
                                    <a>Work</a>
                                    <a>Skills</a>
                                    <a>Languages</a>
                                    <a>Projects</a>
                                    <a>Services</a>
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
        id:reduxState.id
    }
}

export default connect(mapStateToProps,{clearUser})(Header)