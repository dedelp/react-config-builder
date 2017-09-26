import {ConfigItem} from '../dataTypes/ConfigItem'
import * as React from 'react'

export interface ComponentProps {
	Item:ConfigItem,
	update,
	Value:object,
	Components
}

export default abstract class Component<T extends ComponentProps, T2 extends object> extends React.Component<T,T2> {
	constructor(props) {
		super(props)

		var {Item,Value,update} = this.props
		console.log(Item.Label,'Constructor')
	}
	componentWillMount() {
		var {Item,Value,update} = this.props
		var path = Item.getPath()
		if(!path || path === "" || !Value) return
		if(!Value.hasOwnProperty(path))
		{
			update({[path]:Item.Value})
		} else {
			this.updateValue(this.props.Value[path] || Item.Value)
		}
	}
	componentWillUpdate(nextProps,nextState) {
		var Item = nextProps.Item
		var path = Item.getPath()
		var newValue = (nextProps.Value||{})[path]
		var oldValue = (this.props.Value||{})[path]
		if(newValue !== oldValue)
			this.updateValue(newValue)
	}
	updateValue(value) {
		var Item = this.props.Item
		Item.Value = value
	}	

}