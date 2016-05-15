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

				<Game ref='game' x={5} y={5}/>
			</div>
		)
	}
}

export default App;
