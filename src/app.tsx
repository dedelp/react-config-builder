import * as React from 'react';
import './app.css';
import Editor from './Editor'
import * as samples from './samples'


var Config = samples.basicGroupSample.export();





class App extends React.Component<{}, {}> {

	render() {
		//return <span>{Config}</span>
		return <Editor Item={Config} Value={{}}/>
		
	}
}

export default App;