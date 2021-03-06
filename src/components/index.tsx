import * as React from 'react'
import {ConfigString} from '../dataTypes/ConfigString'
import {ConfigItem} from '../dataTypes/ConfigItem'
import EnumInput from './EnumInput'
import StringInput from './StringInput'
import GroupWell from './GroupWell'
import NumberRangeInput from './NumberRangeInput'
import TabGroup from './TabGroup'
import NumberInput from './NumberInput'
import BooleanInput from './BooleanInput'
import EnumGroup from './EnumGroup'
import GroupList from './GroupList'
import StringList from './StringList'
import Group,{GroupProps,GroupState} from './Group'
import Component,{ComponentProps} from './Component'


var DefaultComponents = {
	EnumInput,
	StringInput,
	GroupWell,
	NumberRangeInput,
	TabGroup,
	NumberInput,
	BooleanInput,
	EnumGroup,
	Group,
	GroupList,
	StringList
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

interface ComponentWrapperProps {
	Item,
	update,
	Value,
	Components?:Component<ComponentProps,{}>[]
}
interface ComponentWrapperState {
	Components
}
class ComponentWrapper extends React.Component<ComponentWrapperProps,ComponentWrapperState> {
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
			return <div>Unrecognized ConfigType: {type}</div>
		}
		var Element = React.createElement(Components[type],Object.assign({},this.props,{Components:ComponentWrapper}))
		return Element
	}
}

export default ComponentWrapper;