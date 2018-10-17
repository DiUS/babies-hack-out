import React, {Component} from 'react';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  url() {
    const {text, textType} = this.props;
    const audioSrc = 'http://localhost:8000/read?voiceId=Nicole' +
        '&text=' + text +
        '&textType=' + textType +
        '&outputFormat=mp3';
    return audioSrc;
  }

  componentWillMount() {
    console.log("WM>>>", this.props);
  }

  componentDidUpdate() {
    this.player.current.play();
  }

  componentDidMount() {
    this.player.current.play();
  }

  render() {
    return (
      <div className="Voice">
        <audio src={this.url()} ref={this.player}></audio>
      </div>
    );
  }
};

export default Voice;
