import React, { Component } from 'react';

import './App.css';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import Voice from './Voice';

class App extends Component {
  componentDidMount() {
    // Grab elements, create settings, etc.
    const video = document.getElementById('video');

    // Create a webcam capture
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
  }
  
  speak = () => {
    const text = "Hack babies hack";

    this.setState({text})
  }

  render() {
    const {text} = this.state || {};

    return (
      <div className="App">
        <video id="video" width="640" height="480" autoplay></video>
        <Header />
        <Nav />
        <Main />

        <button onClick={this.speak}>
          Speak
        </button>
        {text && <Voice text={text} textType={"text"}/>}
      </div>
    );
  }
}

export default App;
