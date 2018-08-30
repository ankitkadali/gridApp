import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { render } from "react-dom";
import Chart1 from './chart1.js';
import Chart2 from './chart2.js';

function WarningBanner(props) {
  if (props.warn) {
    return (<div>
          <Chart2 />
        </div>
    );
  }
  if(props.warn ==null){
    return(
      <div>
      hello
      </div>
    );
  }
  return (
      <div>
        <Chart1 />
      </div>
    );
  }
class ChartComponent extends React.Component {
  constructor(props) {
  super(props);
  this.state = {showWarning: null}
  this.handleToggleClick = this.handleToggleClick.bind(this);
}
handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
  render() {

    return (

      <div className="App">
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Line' : 'Bar'}
        </button>
      </div>
    );
  }
}
export default ChartComponent;
