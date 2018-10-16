import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Baby's Day Out</p>
          </h1>
        </header>
        <nav>
          <ul>
            <li>Play</li>
            <li>Train me</li>
          </ul>
        </nav>
        <container>

        </container>
      </div>
    );
  }
}

export default App;
