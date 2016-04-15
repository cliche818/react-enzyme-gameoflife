import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

import '../styles/app';

class App extends Component {
	render () {
		return (
			<div id="app">
				Hello World!
        <div id="globalid">
          global!
        </div>

				<Game x={5} y={5}/>
			</div>
		)
	}
}

export default App;
