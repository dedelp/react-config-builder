import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigNumber} from '../dataTypes/ConfigNumber'
import {SharedOptions} from './'

interface NumberInputProps {
	Item:ConfigNumber,
	update
}
interface NumberState {
	valid:boolean,
	value:number
}

class NumberInput extends React.Component<NumberInputProps, NumberState> {
	constructor(props) {
		super(props)
		this.state = {
			valid:this.checkNumber(props.Item.Value),
			value:props.Item.Value
		}
		
		this.checkNumber = this.checkNumber.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	checkNumber(val) {
		return !isNaN(val);
	}

	onChange(e) {
		var {value} = e.target
		var matches = this.checkNumber(value)
		this.setState(state => Object.assign({},state,{valid:!!matches,value}))
	}
	onBlur(e) {
		const {update,Item} = this.props
		var {value} = e.target
		var matches = this.checkNumber(value)
		if(!matches) {
			this.setState(state => state.valid = false) 
		} else {
			update({[Item.getPath()]:value})
		}
		Item.Value = value
	}

	render() {
		const {update, Item, Item: {Description,Label}} = this.props;
		const {valid,value} = this.state
		var validClass = !valid ? 'error' : value !== Item.Value ? 'valid' : ''
		return (
			<div className="component">
				<label>{Label}</label>
				<input type="number" className={"form-control "+validClass} value={value} onChange={this.onChange} onBlur={this.onBlur} />
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default NumberInput;