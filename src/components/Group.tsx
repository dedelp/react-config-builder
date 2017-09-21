import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface GroupProps {
	Item,
	update,
	Components,
	Value
}
interface GroupState {
	children
}

 class Group extends React.Component<GroupProps, GroupState> {
	constructor(props) {
		super(props)
		this.state = {
			children:this.buildChildren()
		}
		this.buildChildren = this.buildChildren.bind(this)
	}

	buildChildren() {
		const {Item, Components, update,Value} = this.props
		return Item.Children.map(c => React.createElement(Components,Object.assign({},{Item:c,update,Value,key:c.Label})) )
	}

	render() {
		return (
			<div>
				{this.state.children}
			</div>
		)
	}
}
export default Group;