import * as React from 'react';
import './app.scss';
import "react-toggle/style.css"
import Editor from './Editor'
import * as samples from './samples'


var Config = samples.stringListSample





class App extends React.Component<{}, {}> {

	render() {
		//return <span>{Config}</span>
		return <Editor Item={Config} Value={{"datasetName":"sample","settings":{"api":{"url":"/src/example/mock_aggregate.csv","useLocalStorage":false,"method":"GET","type":"JSON","reloadTimeout":0},"globals":["Dataset Name"],"columns":[{"raw":"date","display":"date","datatype":"Datetime","format":"YYYY-MM-DD"},{"raw":"value","display":"value"},{"raw":"total","display":"total","datatype":"Number"},{"raw":"is_mobile","display":"is_mobile","datatype":"Equation","template":"{(is_mobile)} ? \"Mobile\" : \"Desktop\""},{"raw":"company_name","display":"company_name"},{"raw":"valid","display":"valid","datatype":"Number"}],"sort":[{"display":"is_mobile","direction":"ASC"},{"display":"company_name","direction":"DESC"},{"display":"valid","direction":"ASC"}],"filters":{"columns":{"company_name":{"valueFilters":{"hide":["Youspan"]},"filterGroup":{"filters":[{"operator":"Contains","key":"company_name","value":"Jax"},{"operator":"Contains","key":"company_name","value":"you"}],"combinator":"||"}}}}},"type":"External"}}/>
		
	}
}

export default App;