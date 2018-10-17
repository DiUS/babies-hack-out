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

  speak = () => {
    const text = "Hack babies hack";

    this.setState({text})
  }

  predict = async () => {
    const prediction = await classifyVideo(this.state.classifier);
    this.setState({prediction});
  }

  render() {
    const {text, prediction} = this.state || {};

    return (
      <div className="App">
        <video id="video" width="640" height="480" autoPlay></video>
        <Header />
        <Nav />
        <Main />

        <button onClick={this.speak}>
          Speak
        </button>
        {text && <Voice text={text} textType={"text"}/>}

        <button onClick={this.predict}>
          Predict
        </button>

        {prediction && <p>{prediction.result}, {prediction.probability}</p>}
      </div>
    );
  }
}

export default App;
