import {ConfigItem} from '../dataTypes/ConfigItem'
import * as React from 'react'

export interface ComponentProps {
	Item:ConfigItem,
	update,
	Value:object,
	Components,
	hasParent?:boolean
}

export default abstract class Component<T extends ComponentProps, T2 extends object> extends React.Component<T,T2> {
	constructor(props) {
		super(props)

	}
	componentWillMount() {
		var {Item,Value,update,hasParent} = this.props
		if(!hasParent) Item.updateValues(Value,update);
	}
	componentWillUpdate(nextProps,nextState) {
		var Item = nextProps.Item
		var path = Item.getPath()
		var newValue = (nextProps.Value||{})[path]
		var oldValue = (this.props.Value||{})[path]
		console.log(Item.Label,path,nextProps.Value,newValue,oldValue)
		if(newValue !== oldValue)
			this.updateValue(newValue)
	}
	updateValue(value) {
		var Item = this.props.Item
		Item.Value = value
	}	

}