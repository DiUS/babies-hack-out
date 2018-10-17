import React, {Component} from 'react';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  buildUrl(text, textType) {
    const audioSrc = 'http://localhost:8000/read?voiceId=Nicole' +
        '&text=' + text +
        '&textType=' + textType +
        '&outputFormat=mp3';
    return audioSrc;
  }

  urlFromProps = (props) => {
    const {text, textType} = props || {};
    return this.buildUrl(text, textType);
  }

  componentWillMount() {
    console.log("WM>>>", this.props);
  }

  componentDidUpdate() {
    this.player.current.play();
  }

  shouldComponentUpdate(nextProps) {
    return this.buildUrl(nextProps) !== this.buildUrl(this.props);
  }

  componentDidMount() {
    this.player.current.play();
  }

  render() {
    return (
      <div className="Voice">
        <audio src={this.urlFromProps(this.props)} ref={this.player}></audio>
      </div>
    );
  }
};

export default Voice;
