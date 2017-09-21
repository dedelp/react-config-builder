import * as React from 'react'
import {ConfigString} from '../dataTypes/ConfigString'
import EnumInput from './EnumInput'
import StringInput from './StringInput'
import GroupWell from './GroupWell'
import NumberRangeInput from './NumberRangeInput'
import TabGroup from './TabGroup'
import NumberInput from './NumberInput'
import BooleanInput from './BooleanInput'
import EnumGroup from './EnumGroup'
import Group from './Group'


var DefaultComponents = {
	EnumInput,
	StringInput,
	GroupWell,
	NumberRangeInput,
	TabGroup,
	NumberInput,
	BooleanInput,
	EnumGroup,
	Group
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
	Value,
	Components?
}
interface ComponentState {
	Components
}
class ComponentWrapper extends React.Component<ComponentProps,ComponentState> {
	constructor(props) {
		super(props)
		this.state = {
			Components: Object.assign({},DefaultComponents,props.Components)
		}
	}
	render() {
		const  {DefaultComponent, Component} = this.props.Item
		const {Components} = this.state
		var type = Components.hasOwnProperty(Component) ? Component : DefaultComponent
		if(!Components.hasOwnProperty(type))
		{
			console.error('Could not find a Component for ConfigType:', type)
			return null;
		}
		var Element = React.createElement(Components[type],Object.assign({},this.props,{Components:ComponentWrapper}))
		if (!Element) return <div>Unrecognized ConfigType: {type}</div>
		return Element
	}
}

export default ComponentWrapper;