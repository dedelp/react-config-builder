import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'
import Component from './Component'

export interface GroupProps {
	Item:ConfigGroup,
	update,
	Components,
	Value,
}
export interface GroupChild {
	settings,
	Element
}
export interface GroupState {
	children:GroupChild[]
}

class Group<T extends GroupProps,T2 extends GroupState> extends Component<T, T2> {
	constructor(props) {
		super(props)
		this.state = {
			children:this.buildChildren(props)
		} as T2
		this.buildChildren = this.buildChildren.bind(this)
		this.update = this.update.bind(this)
	}
	componentWillUpdate(nextProps,nextState) {
		super.componentWillUpdate(nextProps,nextState)
		nextState.children=this.buildChildren(nextProps)
	}
	buildChildren(props) {
		const {Item, Components, update,Value} = props
		var path = props.Item.getPath()
		return Item.Children.map(c => {
			var props = Object.assign({},{
				Item:c,
				update:(!path || path ==="") ? update : this.update.bind(this),
				Value:(!path || path ==="") ? Value : Value[path],
				key:c.Label,
				hasParent:true
			})
			return {
				settings:c,
				Element:React.createElement(Components,props)
			}
		})
	}
	update(items,i?:any) {
		var path = this.props.Item.getPath()
		if(!path || path == "") {
			this.props.update(items)
		} else {
			this.props.update(Object.keys(items).reduce((res,key) => {
				res[key.startsWith(path) ? key : (path+'.'+key)] = items[key]
				return res
			},{}))
		}
	}

	render() {
		return (
			<div>
				{this.state.children.map(c => c.Element)}
			</div>
		)
	}
}
export default Group;