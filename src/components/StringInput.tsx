import * as React from 'react'
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigString} from '../dataTypes/ConfigString'
import {SharedOptions} from './'
import Component,{ComponentProps} from './Component'

interface StringInputProps extends ComponentProps {
	Item:ConfigString,
	update
}
interface StringState {
	valid:boolean
}

export const StringInputOptions = [].concat(SharedOptions,[	
	new ConfigString({
		"Path": "Matches",
		"Label": "Matches",
		"Description": "",
		"DefaultValue": ""
	})
]);


class StringInput extends Component<StringInputProps, StringState> {
	constructor(props) {
		super(props)
		this.state = {
			valid:this.checkMatch(props.Item.Value),
		}
		
		this.checkMatch = this.checkMatch.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
		setTimeout(() => {
			this.props.update({[props.Item.getPath()]:"This is a test"})
			console.log("updated")
		},2000);
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
		var {value} = e.target
		var matches = this.checkMatch(value)
		if(!matches) {
			this.setState(state => state.valid = false) 
		} else {
			update({[Item.getPath()]:value})
		}
		Item.Value = value
	}

	render() {
		const {update, Item, Item: {Description,Label, Matches}} = this.props;
		const {valid} = this.state
		var validClass = !Matches ? '' : !valid ? 'error' : 'valid'
		return (
			<div className="component">
				<label>{Label}</label>
				<input type="textarea" className={"form-control "+validClass} value={Item.Value} onChange={this.onChange} onBlur={this.onBlur} />
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default StringInput;