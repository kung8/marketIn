import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import routes from './routes';
import { withRouter } from 'react-router-dom';

const contact = {fontSize:"24px",color:"white",textDecoration:"none"}

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
          <a href='mailto:ung.kevin78@gmail.com' style={contact}><h6>Contact</h6></a>
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