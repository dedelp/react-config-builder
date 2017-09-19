import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface GroupWellProps {
	Item,
	update,
	Components,
	Value
}
interface GroupWellState {
	children
}

 class GroupWell extends React.Component<GroupWellProps, GroupWellState> {
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
			<div className="group-well">
				{this.state.children}

			</div>
		)
	}
}
export default GroupWell;