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
    if (this.props.y === message.y && this.props.x - message.x === 1) {
      this.setState({neighbourCount: 1});
    }
  },

  render() {
    return (
      <div className="cell dead"/>
    )
  }
});

module.exports = Cell;
