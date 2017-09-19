import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigBoolean} from '../dataTypes/ConfigBoolean'
import Toggle from 'react-toggle'

interface BooleanInputProps {
	Item,
	update
}
interface BooleanInputState {
	value:boolean
}

 class BooleanInput extends React.Component<BooleanInputProps, BooleanInputState> {
	constructor(props) {
		super(props)
		this.state = {
			value:props.Item.Value 
		}
		this.updateValue = this.updateValue.bind(this)
	}

	updateValue(e) {
		const {Item,update} = this.props
		const value = e.target.checked
		this.setState(state => state.value=value)
		this.props.update({[Item.getPath()]:value})
		Item.Value = value
	}

	render() {
		const {update, Item, Item: {Description,Options,Label}} = this.props;
		const {value} = this.state
		return (
			<div className="component">

				<label>{Label}</label>
				<div>
					<Toggle onChange={this.updateValue} checked={this.state.value} />	
				</div>
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default BooleanInput;