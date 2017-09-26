import * as React from 'react';
import Group,{GroupProps,GroupState} from './Group'
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigEnum} from '../dataTypes/ConfigEnum'
import {ConfigEnumGroup} from '../dataTypes/groups/ConfigEnumGroup'

interface EnumGroupProps extends GroupProps {
	Item:ConfigEnumGroup
}

interface EnumGroupState extends GroupState{
	value:string
}

 class EnumGroup extends Group<EnumGroupProps, EnumGroupState> {
	constructor(props) {
		super(props)
		this.updateValue = this.updateValue.bind(this)
		this.buildChildren = this.buildChildren.bind(this)
	}
	getInitialState() {
		var state = super.getInitialState()
		state.value=this.props.Item.Value
		return state
	}

	updateValue(e) {
		const {Item,update,Value} = this.props
		const value = e.target.value
		this.setState(state => state.value=value)
		Item.Value=value
		this.props.update({[Item.getPath()]:value},true)
	}

	render() {
		const {update, Item, Item: {Description,Options,Label,Value}} = this.props;
		const {value} = this.state
		return (
			<div>

				<label className="d-inline">{Label}</label>
				<div className="description-text d-inline">{Description}</div>
				<select className="form-control" value={Value} onChange={this.updateValue}>
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