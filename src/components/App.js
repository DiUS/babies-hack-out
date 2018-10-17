import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import Voice from './Voice';

class App extends Component {
  speak = () => {
    const text = "Hack babies hack";

    this.setState({text})
  }

  render() {
    const {text} = this.state || {};

    return (
      <div className="App">
        <Header />
        <Nav />
        <Main />

        <button onClick={this.speak}>
          Speak
        </button>
        {text && <Voice text={text} textType={"text"}/>}
        <Voice text={"Hack babies hack"}/>
      </div>
    );
  }
}

export default App;
