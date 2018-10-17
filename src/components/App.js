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
    find: ["ssml", '<speak>Okay! Let\'s find a <break/> <prosody volume="loud"> % </prosody></speak>'],
    found: ["ssml", '<speak>Yay! Well Done! You found the %</speak>']
  }

  objects = ["trumpet", "book", "phone", "fork"];
  
  speakFind = () => {
    const idx = (this.state || {}).idx || 0;
    const object = this.objects[idx];
    const newIdx = (idx+1) % object.length;
    const [format, textPattern] = this.speechPatterns.find;
    const text = textPattern.replace("%", object);
    this.setState({text, textFormat: format, idx: newIdx, lastIdx: idx});
  }

  speakFound = () => {
    const lastIdx = (this.state || {}).lastIdx || 0;
    const idx = (this.state || {}).idx || 0;
    const object = this.objects[lastIdx];
    const [format, textPattern] = this.speechPatterns.found;
    const text = textPattern.replace("%", object);
    this.setState({text, textFormat: format, idx: idx, lastIdx: lastIdx});
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

        <text >
        </text>

        <button onClick={this.speakFind}>
          Say: find
        </button>

        <button onClick={this.speakFound}>
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
