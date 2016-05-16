import React, {component} from 'react';
import ReactDOM from 'react-dom';
import Cell from './cell';

import '../styles/game';

var Game = React.createClass({

  RECEIVING_MESSAGES: 0,
  SENDING_MESSAGE: 1,

  messageBus: [],

  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  componentDidMount() {
    if (this.messageBus.length == (this.props.x * this.props.y)) {
      this.processMessage();
    }
  },

  buildCells() {
    var cells = [];

    for (let x = 0; x < this.props.x; x += 1) {
      for (let y = 0; y < this.props.y; y += 1) {
        let aliveNumber = Math.floor(Math.random() * 10 + 1);
        let alive = aliveNumber > 5;
        cells.push(<Cell ref={`cell-${x}-${y}`} x={x} y={y} alive={ alive } onChange={ this.sendMessage }/>);
        this.messageBus = this.messageBus.concat({x: x, y: y, alive: alive})
      }
    }
    return cells;
  },

  sendMessage(data) {
    this.messageBus = this.messageBus.concat([data]);

    if (this.messageBus.length == (this.props.x * this.props.y)) {
      this.processMessage();
    }
  },

  processMessage() {
    for (let i = 0; i < this.messageBus.length; i++) {
      let message = this.messageBus[i];
      
      if (message.alive) {
        for (var ref in this.refs) {
          this.refs[ref].onBirth(message);
        }
      } 
    }

    setTimeout(this.sendEvaluateMessage, 200);

    this.messageBus = [];
  },

  sendEvaluateMessage() {
    for (var ref in this.refs) {
      this.refs[ref].onEvaluate();
    }
  },

  render() {
    return (
      <div id="game" style={{height: 50 * this.props.y, width: 50 * this.props.x}}>
        {this.buildCells()}
      </div>
    )
  }
});

module.exports = Game;


