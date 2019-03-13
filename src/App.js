import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div>
          <Routes/>
        </div>
        <footer>
          <h6>Copyright@Kevin Ung</h6>
          {/* <a href="/kevinung8.com" style={{fontSize:"20px",color:"white",textDecoration:"none"}}>About</a> */}
          <a href="mailto:ung.kevin78@gmail.com" style={{fontSize:"24px",color:"white",textDecoration:"none"}}><h6>Contact</h6></a>
        </footer>
      </div>
    );
  }
}

export default App;
