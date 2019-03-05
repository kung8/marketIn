import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Routes/>
      </div>
    );
  }
}

export default App;
