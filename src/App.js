import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SysStatus from './components/SysStatus';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Akira</h1>
        </header>
      <SysStatus />
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
