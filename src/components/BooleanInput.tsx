import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigBoolean} from '../dataTypes/ConfigBoolean'
import Toggle from 'react-toggle'
import Component,{ComponentProps} from './Component'


interface BooleanInputState {
}

 class BooleanInput extends Component<ComponentProps, BooleanInputState> {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
		setTimeout(() => {
			this.props.update({[props.Item.getPath()]:true})
			console.log("updated")
		},2000);
	}

	onChange(e) {
		const {Item,update} = this.props
		const value = e.target.checked
		this.props.update({[Item.getPath()]:value})
	}

	render() {
		const {update, Item, Item: {Description,Label}} = this.props;
		return (
			<div className="component">

				<label>{Label}</label>
				<div>
					<Toggle onChange={this.onChange} checked={Item.Value} />	
				</div>
				<div className="description-text">{Description}</div>
			</div>
		)
	}
}
export default BooleanInput;