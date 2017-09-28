import * as React from 'react';
import Group,{GroupProps,GroupState} from './Group'
import ConfigItems,{ConfigType} from '../dataTypes'
import {ConfigEnum} from '../dataTypes/ConfigEnum'
import {ConfigEnumGroup} from '../dataTypes/groups/ConfigEnumGroup'

interface EnumGroupProps extends GroupProps {
	Item:ConfigEnumGroup
}

interface EnumGroupState extends GroupState{
}

 class EnumGroup extends Group<EnumGroupProps, EnumGroupState> {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		const {Item,update,Value} = this.props
		const value = e.target.value
		update({[Item.getPath()]:value})
	}
	buildChildren(props) {
		const {Item, Components, update,Value} = props
		return Item.Children.map(c => {
			var props = Object.assign({},{
				Item:c,
				update:update,
				Value: Value,
				key:c.Label,
				hasParent:true
			})
			return {
				settings:c,
				Element:React.createElement(Components,props)
			}
		})
	}
	render() {
		const {update, Item, Item: {Description,Options,Label,Value}} = this.props;
		return (
			<div>
				<label className="d-inline">{Label}</label>
				<div className="description-text d-inline">{Description}</div>
				<select className="form-control" value={Value} onChange={this.onChange}>
					{(Options ||[]).map(o => 
						<option key={o.value} value={o.value}>
							{o.display || o.value}
						</option>
					)}
				</select>
				{this.state.children.map(c => c.Element)}
			</div>
		)
	}
}
export default EnumGroup;