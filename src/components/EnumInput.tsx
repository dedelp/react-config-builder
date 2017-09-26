import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigEnum} from '../dataTypes/ConfigEnum'
import Component,{ComponentProps} from './Component'

interface EnumInputProps extends ComponentProps {
	Item: ConfigEnum
}

 class EnumInput extends Component<EnumInputProps, {}> {
	constructor(props) {
		super(props)
		
		this.onChange=this.onChange.bind(this)
	}

	onChange(e) {
		const {Item,update} = this.props
		const value = e.target.value
		this.props.update({[Item.getPath()]:value})
	}

	render() {
		const {update, Item, Item: {Description,Options,Label,Value}} = this.props;
		return (
			<div className="component">
				<label>{Label}</label>
				<select className="form-control" value={Value} onChange={this.onChange}>
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