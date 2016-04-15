import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/cell';


var Cell = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      neighbourCount: 0,
      alive: this.props.alive || false
    }
  },

  onBirth(message) {
    if(this.isNeighbour(message)) {
      this.setState({neighbourCount: this.state.neighbourCount + 1});
    }
  },

  onDeath(message) {
    if(this.isNeighbour(message)) {
      this.setState({neighbourCount: this.state.neighbourCount - 1});
    }
  },

  onEvaluate() {
    if (this.state.alive == true) {
      if (this.state.neighbourCount === 2 || this.state.neighbourCount === 3) {
        this.setState({alive: true});
      } else if (this.state.neighbourCount < 2 || this.state.neighbourCount > 3) {
        this.setState({alive: false});
      }
    }
  },

  setNeighbourCount(count) {
    this.setState({neighbourCount: count});
  },

  isNeighbour(message) {
    return (
      (this.props.y === message.y && Math.abs(this.props.x - message.x) === 1) ||
      (this.props.x === message.x && Math.abs(this.props.y - message.y) === 1) ||
      (Math.abs(this.props.x - message.x) === 1 && Math.abs(this.props.y - message.y) === 1)
    );

  },

  addAliveClassName() {
    if (this.state.alive) {
      return ' alive';
    } else {
      return '';
    }
  },

  render() {
    return (
      <div className={"cell" + this.addAliveClassName()}/>
    )
  }
});

module.exports = Cell;
