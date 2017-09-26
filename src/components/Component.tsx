import {ConfigItem} from '../dataTypes/ConfigItem'
import * as React from 'react'

export interface ComponentProps {
	Item:ConfigItem,
	update,
	Value,
	Components
}
export interface ComponentState {
}


export default abstract class Component<T extends ComponentProps, T2 extends ComponentState> extends React.Component<T,T2> {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		var Item = this.props.Item
		var path = Item.getPath()
		this.updateValue(this.props.Value[path] || Item.Value)
	}
	componentWillUpdate(nextProps,nextState) {
		var Item = nextProps.Item
		var path = Item.getPath()
		var newValue = (nextProps.Value||{})[path]
		var oldValue = (this.props.Value||{})[path]
		console.log('componentWillUpdate',nextProps.Item.Label,nextProps.Value,newValue)
		if(newValue !== oldValue)
			this.updateValue(newValue || Item.DefaultValue)
	}
	updateValue(value) {
		var Item = this.props.Item
		Item.Value = value
	}	

}