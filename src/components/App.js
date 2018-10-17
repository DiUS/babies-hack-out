import React, { Component } from 'react';
import ml5 from 'ml5';

import './App.css';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import Voice from './Voice';
import classifyVideo from '../Services/classifyVideo';

class App extends Component {
  constructor(props) {
    super(props);
    this.initialState = {gameState: "FINDING"};
    this.video = React.createRef();
  }

  async componentDidMount() {
    // Grab elements, create settings, etc.
    const video = this.video.current;

    // Create a webcam capture
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();

    const classifier = await ml5.imageClassifier('MobileNet', video);
    console.log("Got classifier!");
    this.setState({classifier});
  }

  speechPatterns = {
    find: ["ssml", '<speak>Go find a <prosody volume="loud" pitch="high"> % </prosody></speak>'],
    found: ["ssml", '<speak>Yay, you found a %</speak>']
  }

  speakFind = () => {
    return this.speak(this.speechPatterns.find);
  }

  speakFound = () => {
    return this.speak(this.speechPatterns.found);
  }

  objects = ['trumpet', 'fork', 'duck']

  speak = (speechPattern) => {
    const idx = (this.state || {}).idx || 0;
    const object = this.objects[idx];
    const newIdx = (idx+1) % object.length;
    const [format, textPattern] = speechPattern;
    const text = textPattern.replace("%", object);
    this.setState({text, textFormat: format, idx: newIdx});
  }

  predict = async () => {
    const prediction = await classifyVideo((this.state || this.initialState).classifier);
    this.setState({prediction});
  }

  doTransitionState = (signal) => {
    return () => {
      console.log(signal, this.state);
      return this.setState(s => this.transition(s, signal))
    };
  }

  gameStates = {
    "TRAINING": {"play": "FINDING"},
    "FINDING": {"found-item": "FOUND", "incorrect": "FINDING"},
    "FOUND": {"next": "FINDING"}
  }

  nextState(currentState, signal) {
    return this.gameStates[currentState][signal];
  }

  transition(state, signal) {
    const nextState = this.nextState((state || this.initialState).gameState, signal);
    if (nextState) {
      return {
        gameState: this.nextState((state || this.initialState).gameState, signal),
        ...state
      };
    } else return state;
  }

  findNewObject = () => {
    const speechPattern = this.speechPatterns.find;
    const idx = (this.state || {}).idx || 0;
    const object = this.objects[idx];
    const newIdx = (idx+1) % object.length;
    const [format, textPattern] = speechPattern;
    const text = textPattern.replace("%", object);

    return {
      voice: {
        text, textFormat: format
      },
      object,
      objectIdx: newIdx
    };
  }

  render() {
    const {text, textFormat, prediction, gameState} = this.state || this.initialState;
    return (
      <div className="App">

        <video ref={this.video} width="640" height="480" autoPlay></video>



        <Header />
        <Nav />
        <Main />

        <br/><br/><br/>
        <hr/>
        <h5>Debug info:</h5>

        {prediction && <p>{prediction.result}, {prediction.probability}</p>}

        <p>Game state: {gameState}</p>

        <p>
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
        </p>
      </div>
    );
  }
}

export default App;
