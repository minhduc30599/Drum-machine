import React, {Component} from "react";
import Drumbutton from "./Drum-button";
import database1 from './Database1';
import database2 from './Database2';
import "./Drum-pad.css";

// Drumpad component
class Drumpad extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        databaseIndex: 0,
        volumeValue: 50,
        displayText: "Welcome",
        power: true
      };
  
      // create Ref for volume logic, volume display, volume icon display, switch database logic, switch database display
      this.iconVolume = React.createRef();
      this.displayVolumeValue = React.createRef();
      this.switchDatabase = React.createRef();
      this.switchDatabaseLabel = React.createRef();
  
      // Drum machine control logic bind this
      this.onDatabaseChanged = this.onDatabaseChanged.bind(this);
      this.onVolumeChanged = this.onVolumeChanged.bind(this);
      this.onMouseLeaveInput = this.onMouseLeaveInput.bind(this);
      this.updateDisplayText = this.updateDisplayText.bind(this);
      this.togglePower = this.togglePower.bind(this);
    }
  
    // database change logic
    onDatabaseChanged({ target }) {
      const databaseIndex = target.checked ? 1 : 0;
      this.setState({
        databaseIndex: databaseIndex,
        displayText: ""
      });
    }
  
    // database display logic
    updateDisplayText(text) {
      this.setState({
        displayText: text
      });
    }
  
    togglePower() {
      this.setState({
        power: !this.state.power
      });
    }
  
    // volume change logic, volume icon display logic
    onVolumeChanged({ target }) {
      const value = Number.parseInt(target.value, 10);
      const iconVolumeElm = this.iconVolume.current;
      const displayVolumeValueElm = this.displayVolumeValue.current;
  
      if (value === 0) iconVolumeElm.className = "fa fa-volume-off";
      else if (value < 50) iconVolumeElm.className = "fa fa-volume-down";
      else iconVolumeElm.className = "fa fa-volume-up";
  
      displayVolumeValueElm.style.setProperty("opacity", 1);
      setTimeout(() => {
        displayVolumeValueElm.style.setProperty("opacity", 0);
      }, 5000);
  
      this.setState({
        volumeValue: value
      });
    }
  
    // volume display logic
    onMouseLeaveInput() {
      setTimeout(() => {
        this.displayVolumeValue.current.style.setProperty("opacity", 0);
      }, 1000);
    }
  
    render() {
      const database = [database1, database2];
  
      const style = this.state.power
        ? { background: "mediumaquamarine" }
        : { background: " #3071a9", boxShadow: "none" };
  
      return (
        <div className="drumpad">
          <div id="display" className="drumpad-display">
            {this.state.power ? this.state.displayText : "See you again"}
          </div>
          <div className="drumpad-control">
            <div className="volume">
              <div className="volume-container">
                <div className="volume-i">
                  <i
                    className="fa fa-volume-down"
                    aria-hidden="true"
                    ref={this.iconVolume}
                  ></i>
                  Volume
                </div>
                <div className="volume-value" ref={this.displayVolumeValue}>
                  {this.state.volumeValue}
                </div>
              </div>
              <input
                type="range"
                onInput={this.onVolumeChanged}
                onMouseLeave={this.onMouseLeaveInput}
                value={this.state.power ? this.state.volumeValue : "0"}
              ></input>
            </div>
            <div className="power">
              <div className="power-text">Power</div>
              <button
                style={style}
                className="power-button"
                onClick={this.togglePower}
              >
                {this.state.power ? "On" : "Off"}
              </button>
            </div>
            <div className="control-kit">
              <div className="control-kit-label">
                {this.state.databaseIndex ? "Smooth Piano Kit" : "Heater Kit"}
              </div>
              <label className="switch">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={this.onDatabaseChanged}
                  ref={this.switchDatabase}
                />
                <span
                  className="slider round"
                  ref={this.switchDatabaseLabel}
                ></span>
              </label>
            </div>
          </div>
          <div className="button">
            {database[this.state.databaseIndex].map((item, idx) => {
              return (
                <Drumbutton
                  key={idx}
                  padItem={item}
                  updateDisplayText={this.updateDisplayText}
                  volumeValue={this.state.volumeValue}
                />
              );
            })}
          </div>
          <div className="drumpad-author">
            Coded by{" "}
            <a target="_blank" href="https://codepen.io/your-work/">
              Minh Duc Nguyen
            </a>
          </div>
        </div>
      );
    }
  }

export default Drumpad;