import React, {Component} from 'react';

import '../styles/cell';

var Cell = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    alive: React.PropTypes.bool.isRequired
  },

  aliveNeighbourCount: 0,

  getInitialState() {
    let aliveStatus = this.props.alive || false;
    let aliveClass = aliveStatus ? 'alive' : 'not-alive';

    return {
      alive: aliveStatus,
      aliveClass: aliveClass
    }
  },

  message() {
    return {x: this.props.x, y: this.props.y, alive: this.state.alive}
  },

  onBirth(message) {
    if (this.isNeighbour(message)) {
      this.aliveNeighbourCount += 1;
    }
  },

  onEvaluate() {
    if (this.state.alive) {
      if (this.aliveNeighbourCount === 2 || this.aliveNeighbourCount === 3) {
        this.props.onChange(this.message());
      } else {
        this.setState({alive: false, aliveClass: 'not-alive'}, function () {
          this.props.onChange(this.message());
        }.bind(this));
      }
    }
    else {
      if (this.aliveNeighbourCount === 3) {
        this.setState({alive: true, aliveClass: 'alive'}, function () {
          this.props.onChange(this.message());
        }.bind(this));
      } else {
        this.props.onChange(this.message());
      }
    }
    this.aliveNeighbourCount = 0;
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
