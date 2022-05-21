import React from "react";
import ReactDom from "react-dom";
import "./Drum-button.css";

const onStyle = {transform: "scale(0.95)", boxShadow: "1px 1px 4px 4px cyan, -1px -1px 4px 4px mediumaquamarine"};
const offStyle = {transform: "scale(1)", boxShadow: "none"};

class Drumbutton extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        style: offStyle
      };
  
      this.textDisplay = React.createRef();
      this.audioHandle = React.createRef();
      this.onDrumPadClick = this.onDrumPadClick.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }
  
    onDrumPadClick() {
      const text = this.props.padItem.id.replace(/-/g, " ");
      const audioHand = this.audioHandle.current;
  
      this.setState({
        style: onStyle
      });
      setTimeout(() => {
        this.setState({
          style: offStyle
        });
      }, 250);
      this.props.updateDisplayText(text);
      audioHand.currentTime = 0;
      audioHand.play();
    }
  
    handleKeyDown(event) {
      const textDisplay = this.textDisplay.current;
  
      if (event.keyCode === this.props.padItem.keyCode) {
        textDisplay.style.setProperty("color", "black");
        setTimeout(() => {
          textDisplay.style.setProperty("color", "white");
        }, 250);
        this.onDrumPadClick();
      }
    }
  
    componentDidUpdate() {
      this.audioHandle.current.volume = this.props.volumeValue / 100;
    }
  
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }
  
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  
    render() {
      const padItem = this.props.padItem;
  
      return (
        <div
          className="drumpad-button drum-pad"
          style={this.state.style}
          id={padItem.id}
          onClick={this.onDrumPadClick}
          ref={this.textDisplay}
        >
          <audio
            className="buttons clip"
            id={padItem.letter}
            src={padItem.url}
            ref={this.audioHandle}
          />
          {padItem.letter}
        </div>
      );
    }
  }

export default Drumbutton;