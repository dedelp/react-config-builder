import * as React from 'react';
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigEnum} from '../dataTypes/ConfigEnum'

interface EnumGroupProps {
	Item,
	update,
	Components,
	Value
}
interface EnumGroupState {
	value:string
}

 class EnumGroup extends React.Component<EnumGroupProps, EnumGroupState> {
	constructor(props) {
		super(props)
		this.state = {
			value:props.Item.Value 
		}
		this.updateValue = this.updateValue.bind(this)
		this.buildChildren = this.buildChildren.bind(this)
	}

	updateValue(e) {
		const {Item,update,Value} = this.props
		const value = e.target.value
		this.setState(state => state.value=value)
		Item.Value=value
		this.props.update({[Item.getPath()]:value},true)
	}

	buildChildren() {
		const {Item, Components, update,Value} = this.props
		return (Item.Children||[]).map(c => React.createElement(Components,Object.assign({},{Item:c,update,Value,key:c.Label})) )
	}
	render() {
		const {update, Item, Item: {Description,Options,Label}} = this.props;
		const {value} = this.state
		return (
			<div>

				<label className="d-inline">{Label}</label>
				<div className="description-text d-inline">{Description}</div>
				<select className="form-control" value={value} onChange={this.updateValue}>
					{(Options ||[]).map(o => 
						<option key={o.value} value={o.value}>
							{o.display || o.value}
						</option>
					)}
				</select>
				{this.buildChildren()}
			</div>
		)
	}
}
export default EnumGroup;