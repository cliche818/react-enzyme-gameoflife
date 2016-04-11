import React, {component} from 'react';
import ReactDOM from 'react-dom';
import Cell from './cell';

import '../styles/game';

var Game = React.createClass({

  RECEIVING_MESSAGES: 0,
  SENDING_MESSAGE: 1,

  getInitialState() {
    return {
      messageState: this.RECEIVING_MESSAGES,
      messageBus: [],
      generation: 0
    }
  },

  buildCells() {
    var cells = [];

    for (let x = 0; x < this.props.x; x += 1) {
      for (let y = 0; y < this.props.y; y += 1) {
        cells.push(<Cell x={x} y={y}/>);
      }
    }

    return cells
  },

  render() {
    return (
      <div id="game">
        { this.buildCells() }
      </div>
    )
  }
});

module.exports = Game;


