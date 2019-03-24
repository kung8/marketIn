import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import routes from './routes';
import { withRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div>
          {routes}
        </div>
        <footer>
          <h6>Copyright@Kevin Ung</h6>
          {/* <a href="/kevinung8.com" style={{fontSize:"20px",color:"white",textDecoration:"none"}}>About</a> */}
          <a href='mailto:ung.kevin78@gmail.com' style={{fontSize:"24px",color:"white",textDecoration:"none"}}><h6>Contact</h6></a>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(reduxState){
  return{
    email:reduxState.email
  }
}

export default withRouter(connect(mapStateToProps)( App))