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

  speechPatterns = {
    find: ["ssml", '<speak>Go find a %</speak>'],
    found: ["ssml", '<speak>Yay, you found a %</speak>']
  }

  speak = () => {
    console.log(">>>>>", this.state);
    const objects = ["trumpet", "book", "phone", "fork"];
    const idx = (this.state || {}).idx || 0;
    const object = objects[idx];
    const newIdx = (idx+1) % object.length;
    const [format, textPattern] = this.speechPatterns.find;
    const text = textPattern.replace("%", object);
    this.setState({text, textFormat: format, idx: newIdx});
  }

  render() {
    const {text, textFormat} = this.state || {};
    console.log(">>>>>", text, textFormat);
    return (
      <div className="App">
        <video id="video" width="640" height="480" autoplay></video>
        <Header />
        <Nav />
        <Main />

        <button onClick={this.speak}>
          Say: find
        </button>

        <button onClick={this.speak}>
          Say: found
        </button>
        {text && <Voice text={text} textType={textFormat}/>}
      </div>
    );
  }
}

export default App;
