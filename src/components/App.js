import React, { Component } from 'react';
import ml5 from 'ml5';

import './App.css';
import Header from './Header';
//import Main from './Main';
import Nav from './Nav';
import Voice from './Voice';
import classifyVideo from '../Services/classifyVideo';

class App extends Component {
  constructor() {
    super();
    this.classifier = null;
    this.state = {
      totalLoss: 0,
      background: 0,
      trumpet: 0,
      duck: 0,
      fork: 0,
      loss: 0,
      text: '',
      prediction: null
    }
  }

  async componentDidMount() {
    // Grab elements, create settings, etc.
    const video = document.getElementById('video');

    // Create a webcam capture
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();

    const featureExtractor = await ml5.featureExtractor('MobileNet');
    this.classifier = await featureExtractor.classification(video);
  }

  speak = () => {
    const text = "Hack babies hack";

    this.setState({text})
  }

  gotResults(err, data) {
    if (err) {
      console.error(err);
    }
    this.setState({prediction: data});
    this.classifier.classify(this.gotResults);
  }

  predict = async () => {
    this.classifier.predict(this.gotResults);
  }

  trainClassifier = () => {
    if (!this.classifier) {
      console.log('classifier not defined');
      return;
    }

    this.classifier.train(lossValue => {
      if (lossValue) {
        this.setState({ totalLoss: lossValue });
        this.setState({ loss: `Loss: ${this.state.totalLoss}` });
      } else {
        this.setState({ loss: `Done Training! Final Loss: ${this.state.totalLoss}` });
      }
    })
  }

  addImage = (label) => {
    if (!this.classifier) {
      console.log('classifier not defined');
      return;
    }
    this.classifier.addImage(label);
    console.log('Image added ', label);
  }

  render() {
    const {text, prediction} = this.state || {};

    return (
      <div className="App">
        <video id="video" width="640" height="480" autoPlay></video>
        <Header />

        <div> 
          <h2>Train the game</h2>
          <br/>
          <br/>
          <button onClick={this.addImage.bind(this, 'background')}>Add empty background</button>
          <span> added</span>
          <br/>
          <button onClick={this.addImage.bind(this, 'trumpet')}>Add Trumpet image</button>
          <span> added</span>
          <br/>
          <button onClick={this.addImage.bind(this, 'duck')}>Add Duck image</button>
          <span> added</span>
          <br/>
          <button onClick={this.addImage.bind(this, 'fork')}>Add Fork image</button>
          <span> added</span>
          <br/>
          <br/>
          <button onClick={this.trainClassifier}>Start Training</button>
          <br/>
          {this.state.loss}
        </div>
      
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
