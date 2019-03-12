import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/userActions';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Header extends Component {

    
    logout =async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        // this.props.history.push('/'); 

    }
    render(){
        console.log(this.props)
        return(
            <div className="header-container">
                <div className="header">
                    <div className="marketin-logo">MI</div>
                    <h1 className="marketin-name">MarketIn</h1>
                </div>
                {this.props.id?
                    (<div className="logout-button-container">
                        <Link to='/'><button className="logout-button" onClick={this.logout}>Logout</button></Link>
                        {/* <button className="logout-button" onClick={()=>this.logout()}>Logout</button> */}
                    </div>):null
                }
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