import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

import '../styles/app';

class App extends Component {
	componentDidMount() {
    console.log(this.refs['game'])
  }

	render () {
		return (
			<div id="app">
				Hello World!
        <div id="globalid">
          global!
        </div>

				<Game ref='game' x={50} y={50}/>
			</div>
		)
	}
}

export default App;
