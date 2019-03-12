import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header/>
        </div>
        <div>
          <Routes/>
        </div>
        <footer>
          <h6>Copyright@Kevin Ung</h6>
          <h6>Contact</h6>
          <h6>About</h6>
        </footer>
      </div>
    );
  }
}

export default App;
