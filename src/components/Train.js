import React, { Component } from 'react';

class Train extends Component{

  constructor(props) {
    super(props);
    this.state = {
      totalLoss: 0,
      background: 0,
      trumpet: 0,
      duck: 0,
      fork: 0,
      loss: 0
    }
  }

  trainClassifier = () => {
    if (!this.props.classifier) {
      console.log('classifier not defined');
      return;
    }

    this.props.classifier.train(lossValue => {
      if (lossValue) {
        this.setState({ totalLoss: lossValue });
        this.setState({ loss: `Loss: ${this.state.totalLoss}` });
      } else {
        this.setState({ loss: `Done Training! Final Loss: ${this.state.totalLoss}` });
      }
    })
  }

  addImage = (label) => {
    if (!this.props.classifier) {
      console.log('classifier not defined');
      return;
    }
    this.props.classifier.addImage(label);
    console.log('Image added ', label);
  }

  render() {
    return (
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
    );
  }

}

export default Train;
