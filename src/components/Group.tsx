import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface GroupProps {
	Item,
	update,
	Components,
	Value,
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
		this.update = this.update.bind(this)
	}

	buildChildren() {
		const {Item, Components, update,Value} = this.props
		var path = this.props.Item.getPath()	
		if(!path || path == "")
			return Item.Children.map(c => React.createElement(Components,Object.assign({},{Item:c,update,Value,key:c.Label})) )
		return Item.Children.map(c => {
			//c.SubPath = path+'.'
			React.createElement(Components,Object.assign({},{Item:c,update:this.update,Value,key:c.Label})) 
		})
	}
	update(items) {
		
		var path = this.props.Item.getPath()
		if(!path || path == "") {
			this.props.update(items)
		} else {
			var newItems = {}
			Object.keys(items).forEach(k => {
				newItems[k.startsWith(path) ? k : (path+'.'+k)] = items[k]
			})
			this.props.update(newItems)
		}
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