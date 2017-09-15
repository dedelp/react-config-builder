import * as React from 'react'
import {ConfigString} from '../dataTypes/ConfigString'
import EnumInput from './EnumInput'
import StringInput from './StringInput'
import GroupWell from './GroupWell'
import NumberRangeInput from './NumberRangeInput'


var Components = {
	'enum': EnumInput,
	'string': StringInput,
	'group': GroupWell,
	'numberRange': NumberRangeInput
}
export const SharedOptions = [
	new ConfigString({
		"Path": "Label",
		"Label": "Label",
		"Description": "",
		"DefaultValue": ""
	}),
	new ConfigString({
		"Path": "Description",
		"Label": "Description",
		"Description": "",
		"DefaultValue": ""
	}),	
	new ConfigString({
		"Path": "Path",
		"Label": "Path",
		"Description": "",
		"DefaultValue": ""
	}),
]
interface ComponentProps {
	Item,
	update,
	Value
}
class ComponentWrapper extends React.Component<ComponentProps,{}> {
	render() {
		const {Type} = this.props.Item
		var Component = null;
		switch (Type) {
			default:
				if(!Components.hasOwnProperty(Type))
				{
					console.error('Could not find a Component for ConfigType:', Type)
					break;
				}
				Component = React.createElement(Components[Type],Object.assign({},this.props,{Components:ComponentWrapper}))
		}
		if (!Component) return <div>Unrecognized ConfigType: {Type}</div>
		return Component
	}
}

export default ComponentWrapper;