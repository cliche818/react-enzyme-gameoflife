import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/app';

class App extends Component {
	render () {
		return (
			<div id="app">
				Hello World!
        <div id="globalid">
          global!
        </div>
			</div>
		)
	}
}

export default App;
