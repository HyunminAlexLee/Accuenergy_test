import React, { Component } from "react";
import ReactDOM from "react-dom";
import './App.css';
import LocationList from "./src/components/LocationList";

export default class App extends Component {

	render() {
		return (
			<div className="App">
				<LocationList/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));