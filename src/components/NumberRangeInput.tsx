import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigNumberRange} from '../dataTypes/ranges/ConfigNumberRange'
import {ConfigNumber} from '../dataTypes/ConfigNumber'
import {SharedOptions} from './'

interface NumberRangeInputProps {
	Item:ConfigNumberRange,
	update
}
interface NumberRangeState {
	valid:boolean,
	value:string
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


class NumberRangeInput extends React.Component<NumberRangeInputProps, NumberRangeState> {
	constructor(props) {
		super(props)
		this.state = {
			valid:this.checkRange(props.Item.Value),
			value:props.Item.Value
		}
		
		this.checkRange = this.checkRange.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	checkRange(val) {
		return true
	}

	onChange(e) {
		var {value} = e.target
		var valid = this.checkRange(value)
		this.setState(state => Object.assign({},state,{valid,value}))
	}
	onBlur(e) {
		/*
		const {update,Item} = this.props
		var matches = this.checkMatch(e.target.value)
		if(!matches) {
			this.setState(state => state.valid = false) 
		} else {
			update({[Item.getPath()]:e.target.value})
		}
		*/
	}

	render() {
		const {update, Item, Item: {Description,Label, MinValue,MaxValue,Step}} = this.props;
		const {valid,value} = this.state
		const inputProps = {
			value,
			min:MinValue,
			max:MaxValue,
			step: Step
		}
		if(!inputProps.step || inputProps.step <= 0) delete inputProps.step; 
		return (
			<div className="component">
				<label>{Label}</label>
				<div style={{fontSize:'2rem', textAlign:'center'}}>{value}</div>
				<input type="range" className={"form-control "+(!valid ? 'error' : '')} {...inputProps} onChange={this.onChange} onBlur={this.onBlur} />
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default NumberRangeInput;