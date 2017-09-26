import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigNumber} from '../dataTypes/ConfigNumber'
import {SharedOptions} from './'
import Component, {ComponentProps, ComponentState} from './Component'
console.log({Component})

interface NumberInputProps extends ComponentProps{
	Item:ConfigNumber
}
interface NumberInputState extends ComponentState {
	valid:boolean
}

class NumberInput extends Component<NumberInputProps, NumberInputState> {
	constructor(props) {
		super(props)
		this.state = {
			valid:this.checkNumber(props.Item.Value)
		}
		
		this.checkNumber = this.checkNumber.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	checkNumber(val) {
		return !isNaN(val);
	}

	onChange(e) {
		var {value} = e.target
		var {update,Item} = this.props
		var matches = this.checkNumber(value)
		if(matches) update({[Item.getPath()]:value})
	}

	render() {
		console.log('render')
		const {update, Item, Item: {Description,Label,Value}} = this.props;
		const {valid} = this.state
		var validClass = !valid ? 'error' : 'valid' 
		return (
			<div className="component">
				<label>{Label}</label>
				<input type="number" className={"form-control "+validClass} value={Value} onChange={this.onChange} />
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default NumberInput;