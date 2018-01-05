import React, { Component } from 'react';
import logo from './logo.svg';
import './vendor/bootstrap.css';
import SysStatus from './components/SysStatus';
import AuthenticationForm from './components/AuthenticationForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Akira</h1>
        </header>
      <SysStatus />
      <AuthenticationForm />
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
