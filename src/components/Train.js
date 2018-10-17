import React, { Component } from 'react';
import ml5 from 'ml5';

class Train extends Component{
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const featureExtractor = await ml5.featureExtractor('MobileNet');
    const classifier = featureExtractor.classification(video);
    this.setState({classifier});
  }

  trainClassifier() {
    this.state.classifier.train(function(lossValue) {
      if (lossValue) {
        totalLoss = lossValue;
        loss.innerHTML = 'Loss: ' + totalLoss;
      } else {
        loss.innerHTML = 'Done Training! Final Loss: ' + totalLoss;
      }
  }

  render() {
    return (
      <div>
        <h2>Train the game</h2>
        <br/>
        <br/>
        <button onClick={this.state.classifier.addImage('background')}>Add empty background</button>
        <span> added</span>
        <br/>
        <button onClick={this.state.classifier.addImage('trumpet')}>Add Trumpet image</button>
        <span> added</span>
        <br/>
        <button onClick={this.state.classifier.addImage('duck')}>Add Duck image</button>
        <span> added</span>
        <br/>
        <button onClick={this.state.classifier.addImage('fork')}>Add Fork image</button>
        <span> added</span>
        <br/>
        <br/>
        <button onClick={this.trainClassifier()}>Start Training</button>
      </div>
    );
  }

}

export default Train;
