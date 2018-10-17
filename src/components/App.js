import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import Voice from './components/Voice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Main />
        <Voice text={"Hack babies hack"}/>
      </div>
    );
  }
}

export default App;
