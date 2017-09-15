import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigEnum} from '../dataTypes/ConfigEnum'

interface EnumInputProps {
	Item,
	update
}
interface EnumInputState {
	value:string
}

 class EnumInput extends React.Component<EnumInputProps, EnumInputState> {
	constructor(props) {
		super(props)
		this.state = {
			value:props.Item.Value 
		}
		this.updateValue = this.updateValue.bind(this)
	}

	updateValue(e) {
		const {Item,update} = this.props
		const value = e.target.value
		this.setState(state => state.value=value)
		this.props.update({[Item.getPath()]:value})
	}

	render() {
		const {update, Item, Item: {Description,Options,Label}} = this.props;
		const {value} = this.state
		return (
			<div className="component">

				<label>{Label}</label>
				<select className="form-control" value={value} onChange={this.updateValue}>
					{(Options ||[]).map(o => 
						<option key={o.value} value={o.value}>
							{o.display || o.value}
						</option>
					)}
				</select>
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default EnumInput;