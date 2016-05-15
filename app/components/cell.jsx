import React, {Component} from 'react';
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

  message() {
    return {x: this.props.x, y: this.props.y, alive: this.state.alive}
  },

  onBirth(message) {
    // console.log('everyone gets one');
    if (this.isNeighbour(message)) {
      console.log(`BIRTH x: ${this.props.x} y: ${this.props.y} valid message: x ${message.x}, y ${message.y}, alive ${message.alive}`)
      this.setState({neighbourCount: this.state.neighbourCount + 1});
    }
  },

  onDeath(message) {
    // console.log('everyone gets one');
    if (this.isNeighbour(message)) {
      console.log(`DEATH x: ${this.props.x} y: ${this.props.y} valid message: x ${message.x}, y ${message.y}, alive ${message.alive}`)
      this.setState({neighbourCount: this.state.neighbourCount - 1});
    }
  },

  onEvaluate() {
    // console.log('process')
    // console.log(`x: ${this.props.x} y: ${this.props.y} alive: ${this.state.alive} neighbourCount: ${this.state.neighbourCount}`);
    if (this.state.alive) {
      if (this.state.neighbourCount === 2 || this.state.neighbourCount === 3) {
        this.setState({alive: true, aliveClass: 'alive', neighbourCount: 0}, function () {
          this.props.onChange(this.message());
        }.bind(this));
      } else if (this.state.neighbourCount < 2 || this.state.neighbourCount > 3) {
        this.setState({alive: false, aliveClass: '', neighbourCount: 0}, function () {
          this.props.onChange(this.message());
        }.bind(this));
      }
    }
    else {
      if (this.state.neighbourCount === 3) {
        this.setState({alive: true, aliveClass: 'alive', neighbourCount: 0}, function () {
          this.props.onChange(this.message());
        }.bind(this));
      } else {
        this.setState({neighbourCount: 0}, function () {
          this.props.onChange(this.message());
        }.bind(this));
      }
    }

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
