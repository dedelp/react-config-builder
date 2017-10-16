import * as React from 'react';
import './app.scss';
import "react-toggle/style.css"
import Editor from './Editor'
import * as samples from './samples'


var Config = samples.stringListSample

var Value = { "type": "Aggregate", "settings": { "aggregate": { "columns": ["company_name"], "values": [{ "display": "Sum of total", "function": "Sum", "datatype": "Number", "raw": "total" }], "rows": ["company_name"] } }, "datasetName": "Pivot", "useDataset": "sample" }



class App extends React.Component<{}, {}> {

	render() {
		//return <span>{Config}</span>
		return <Editor Item={Config} Value={Value} />

	}
}

export default App;