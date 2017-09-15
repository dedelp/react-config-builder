import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigString} from '../dataTypes/ConfigString'
import {SharedOptions} from './'

interface StringInputProps {
	Item:ConfigString,
	update
}
interface StringState {
	valid:boolean,
	value:string
}

export const StringInputOptions = [].concat(SharedOptions,[	
	new ConfigString({
		"Path": "Matches",
		"Label": "Matches",
		"Description": "",
		"DefaultValue": ""
	})
]);


class StringInput extends React.Component<StringInputProps, StringState> {
	constructor(props) {
		super(props)
		this.state = {
			valid:this.checkMatch(props.Item.Value),
			value:props.Item.Value
		}
		
		this.checkMatch = this.checkMatch.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	checkMatch(val) {
		var {Matches} = this.props.Item
		if(!Matches || Matches == '') return true;
		var regx = new RegExp(Matches)
		return val.match(regx)
	}

	onChange(e) {
		var {value} = e.target
		var matches = this.checkMatch(value)
		this.setState(state => Object.assign({},state,{valid:!!matches,value}))
	}
	onBlur(e) {
		const {update,Item} = this.props
		var matches = this.checkMatch(e.target.value)
		if(!matches) {
			this.setState(state => state.valid = false) 
		} else {
			update({[Item.getPath()]:e.target.value})
		}
	}

	render() {
		const {update, Item, Item: {Description,Label, Matches}} = this.props;
		const {valid,value} = this.state
		var validClass = !Matches ? '' : !valid ? 'error' : value !== Item.Value ? 'valid' : ''
		return (
			<div className="component">
				<label>{Label}</label>
				<input type="textarea" className={"form-control "+validClass} value={value} onChange={this.onChange} onBlur={this.onBlur} />
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default StringInput;