import React, {Component} from 'react';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  componentWillMount() {
    const {text, textType} = this.props;
    const audioSrc = 'http://localhost:8000/read?voiceId=Nicole' +
        '&text=' + text +
        '&textType=' + textType +
        '&outputFormat=mp3';
    this.setState({audioSrc});
  }

  componentDidMount() {
    this.player.current.play();
  }

  render() {
    const {audioSrc} = this.state;

    return (
      <div className="Voice">
        <audio src={audioSrc} ref={this.player}></audio>
      </div>
    );
  }
};

export default Voice;
