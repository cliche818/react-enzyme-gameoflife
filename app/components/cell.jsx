import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/cell';


var Cell = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      neighbourCount: 0
    }
  },

  onBirth(message) {
    if (this.isNeighbour(message)) {
      this.setState({neighbourCount: this.state.neighbourCount + 1});
    }
  },

  isNeighbour(message) {
    return (
      (this.props.y === message.y && Math.abs(this.props.x - message.x) === 1) ||
      (this.props.x === message.x && Math.abs(this.props.y - message.y) === 1) ||
      (Math.abs(this.props.x - message.x) === 1 && Math.abs(this.props.y - message.y) === 1)
    );

  },

  render() {
    return (
      <div className="cell dead"/>
    )
  }
});

module.exports = Cell;
