import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigNumberRange} from '../dataTypes/ranges/ConfigNumberRange'
import {ConfigNumber} from '../dataTypes/ConfigNumber'
import {SharedOptions} from './'
import Component,{ComponentProps} from './Component'

interface NumberRangeInputProps extends ComponentProps {
	Item:ConfigNumberRange,
	update
}
interface NumberRangeState {
	valid:boolean
}

export const NumberInputOptions = [].concat(SharedOptions,[	
	new ConfigNumber({
		"Path": "MinValue",
		"Label": "Minimum Value",
		"Description": "",
		"DefaultValue": 0
	}),
	new ConfigNumber({
		"Path": "MaxValue",
		"Label": "Maximum Value",
		"Description": "",
		"DefaultValue": 100
	}),
	new ConfigNumber({
		"Path": "Step",
		"Label": "Step",
		"Description": "(Optional) The amount the user is able to step when using a slider",
		"DefaultValue": 1
	})
]);


class NumberRangeInput extends Component<NumberRangeInputProps, NumberRangeState> {
	constructor(props) {
		super(props)
		this.state = {
			valid:this.checkRange(props.Item.Value),
		}
		
		this.checkRange = this.checkRange.bind(this)
		this.onChange = this.onChange.bind(this)

	}	

	checkRange(val) {
		return true
	}

	onChange(e) {
		const {update,Item} = this.props
		var {value} = e.target
		var valid = this.checkRange(value)
		this.setState(state => Object.assign({},state,{valid,value}))
		update({[Item.getPath()]:value})
		Item.Value = value
	}

	render() {
		const {update, Item, Item: {Description,Label, MinValue,MaxValue,Step}} = this.props;
		const {valid} = this.state
		const inputProps = {
			value:Item.Value,
			min:MinValue,
			max:MaxValue,
			step: Step
		}
		if(!inputProps.step || inputProps.step <= 0) delete inputProps.step; 
		return (
			<div className="component">
				<label>{Label}</label>
				<div style={{fontSize:'2rem', textAlign:'center'}}>{Item.Value}</div>
				<input type="range" className={"form-control "+(!valid ? 'error' : '')} {...inputProps} onChange={this.onChange} />
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default NumberRangeInput;