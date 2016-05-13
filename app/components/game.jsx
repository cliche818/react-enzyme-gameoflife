import React, {component} from 'react';
import ReactDOM from 'react-dom';
import Cell from './cell';

import '../styles/game';

var Game = React.createClass({

  RECEIVING_MESSAGES: 0,
  SENDING_MESSAGE: 1,

  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      messageState: this.RECEIVING_MESSAGES,
      messageBus: [],
      generation: 0
    }
  },

  componentDidMount() {

  },

  buildCells() {
    var cells = [];

    for (let x = 0; x < this.props.x; x += 1) {
      for (let y = 0; y < this.props.y; y += 1) {
        let aliveNumber = Math.floor(Math.random() * 10 + 1);
        cells.push(<Cell ref={`cell-${x}-${y}`} x={x} y={y} alive={aliveNumber < 4 } onChange={ () => this.sendMessage }  />);
      }
    }
    
    return cells;
  },

  sendMessage(data) {
    this.setState({messageBus: this.state.messageBus.concat([data])});

    if (this.state.messageBus.length == (this.props.x * this.props.y)) {
      this.processMessage();
    }
  },

  processMessage() {
    let message = this.state.messageBus[0];
    if (message.alive) {
      for (var ref in this.refs) {
        this.refs[ref].onBirth(message);
      }
    } else {
      for (var ref in this.refs) {
        this.refs[ref].onDeath(message);
      }
    }
    
    this.sendEvaluateMessage();
    
    this.setState({messageBus: []});
  },

  sendEvaluateMessage() {
    for (var ref in this.refs) {
      this.refs[ref].onEvaluate();
    }
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


