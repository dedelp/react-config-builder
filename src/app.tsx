import * as React from 'react';
import './app.scss';
import "react-toggle/style.css"
import Editor from './Editor'
import * as samples from './samples'


var Config = samples.stringListSample





class App extends React.Component<{}, {}> {

	render() {
		//return <span>{Config}</span>
		return <Editor Item={Config} Value={{"rows": [
			{
			  "display": "Test 1",
			  "width": 100
			}
		  ]}}/>
		
	}
}

export default App;