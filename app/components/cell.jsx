import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/cell';

var Cell = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    alive: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    let aliveStatus = this.props.alive || false;
    let aliveClass = aliveStatus ? 'alive' : '';

    return {
      neighbourCount: 0,
      alive: aliveStatus,
      aliveClass: aliveClass
    }
  },

  componentDidMount() {
    this.props.onChange(this.message());
  },

  message() {
    return {x: this.props.x, y: this.props.y, alive: this.props.alive}
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
    if (this.state.alive) {
      if (this.state.neighbourCount === 2 || this.state.neighbourCount === 3) {
        this.setState({alive: true, aliveClass: 'alive'});
      } else if (this.state.neighbourCount < 2 || this.state.neighbourCount > 3) {
        this.setState({alive: false, aliveClass: ''});
      }
    } else {
      if (this.state.neighbourCount === 3) {
        this.setState({alive: true, aliveClass: 'alive'});
      }
    }

    this.setState({neighbourCount: 0});
    this.props.onChange(this.message());
  },

  // used for testing
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

  render() {
    return (
      <div className={`cell ${this.state.aliveClass}` }/>
    )
  }
});

module.exports = Cell;
