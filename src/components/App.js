import React, { Component } from 'react';
import ml5 from 'ml5';

import './App.css';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import Voice from './Voice';
import classifyVideo from '../Services/classifyVideo';

class App extends Component {
  async componentDidMount() {
    // Grab elements, create settings, etc.
    const video = document.getElementById('video');

    // Create a webcam capture
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();

    const classifier = await ml5.imageClassifier('MobileNet', video);
    this.setState({classifier});
  }

  speechPatterns = {
    find: ["ssml", '<speak>Go find a %</speak>'],
    found: ["ssml", '<speak>Yay, you found a %</speak>']
  }

  speak = () => {
    const objects = ["trumpet", "book", "phone", "fork"];
    const idx = (this.state || {}).idx || 0;
    const object = objects[idx];
    const newIdx = (idx+1) % object.length;
    const [format, textPattern] = this.speechPatterns.find;
    const text = textPattern.replace("%", object);
    this.setState({text, textFormat: format, idx: newIdx});
  }

  predict = async () => {
    const prediction = await classifyVideo(this.state.classifier);
    this.setState({prediction});
  }

  render() {
    const {text, textFormat, prediction} = this.state || {};
    console.log(">>>>>", text, textFormat);
    return (
      <div className="App">
        <video id="video" width="640" height="480" autoPlay></video>
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

        <button onClick={this.predict}>
          Predict
        </button>

        {prediction && <p>{prediction.result}, {prediction.probability}</p>}
      </div>
    );
  }
}

export default App;
