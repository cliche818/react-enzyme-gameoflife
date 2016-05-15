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
      // console.log('component did mount: just once');
      this.processMessage();
    }
  },

  buildCells() {
    // console.log('only run once');

    var cells = [];

    for (let x = 0; x < this.props.x; x += 1) {
      for (let y = 0; y < this.props.y; y += 1) {
        let aliveNumber = Math.floor(Math.random() * 10 + 1);
        let alive = aliveNumber > 4;
        cells.push(<Cell ref={`cell-${x}-${y}`} x={x} y={y} alive={ alive } onChange={ this.sendMessage }/>);
        this.messageBus = this.messageBus.concat({x: x, y: y, alive: alive})
      }
    }
    return cells;
  },

  sendMessage(data) {
    // console.log(`recevied message: x ${data.x}, y ${data.y}, alive ${data.alive}`);
    this.messageBus = this.messageBus.concat([data]);

    if (this.messageBus.length == (this.props.x * this.props.y)) {
      // console.log('called?')
      this.processMessage();
    }
  },

  processMessage() {
    for (let i = 0; i < this.messageBus.length; i++) {
      let message = this.messageBus[i];

      // console.log(message);
      // console.log(this.cells);
      //console.log(`refs: ${this.refs['cell-0-0']}`);
      if (message.alive) {
        for (var ref in this.refs) {
          // console.log(` birth: ${ref}`)
          this.refs[ref].onBirth(message);
        }
      } else {
        for (var ref in this.refs) {
          // console.log(` death: ${ref}`)
          this.refs[ref].onDeath(message);
        }
      }
    }

    setTimeout(this.sendEvaluateMessage, 300);

    this.messageBus = [];
  },

  sendEvaluateMessage() {
    for (var ref in this.refs) {
      this.refs[ref].onEvaluate();
    }
  },

  render() {
    return (
      <div id="game">
        {this.buildCells()}
      </div>
    )
  }
});

module.exports = Game;


