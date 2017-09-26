import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'
import {ConfigItem} from '../dataTypes/ConfigItem'
import Component from './Component'

export interface GroupProps {
	Item:ConfigGroup,
	update,
	Components,
	Value,
}
export interface GroupState {
	children
}

abstract class Group<T extends GroupProps ,T2 extends GroupState > extends Component<T, T2> {
	constructor(props) {
		super(props)
		this.state = this.getInitialState()
		this.buildChildren = this.buildChildren.bind(this)
		this.update = this.update.bind(this)
	}
	getInitialState() {
		return {
			children:this.buildChildren()
		} as T2
	}
	componentWillUpdate(nextProps,nextState) {
		super.componentWillUpdate(nextProps,nextState)
		nextState.children = this.buildChildren()
	}
	buildChildren():any {
		const {Item, Components, update,Value} = this.props
		var path = this.props.Item.getPath()	
		if(!path || path == "")
			return Item.Children.map(c => React.createElement(Components,Object.assign({},{Item:c,update,Value,key:c.Label})) )
		return Item.Children.map(c => {
			c.SubPath = path+'.'
			return React.createElement(Components,Object.assign({},{Item:c,update:this.update.bind(this),Value,key:c.Label})) 
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