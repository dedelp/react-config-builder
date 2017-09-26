import * as React from 'react';
import Group,{GroupProps,GroupState} from './Group'
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface TabGroupState extends GroupState {
	selectedIndex
}

 class TabGroup extends Group<GroupProps, TabGroupState> {
	element = null
	constructor(props) {
		super(props)

		this.buildChildren = this.buildChildren.bind(this)
		this.selectTab = this.selectTab.bind(this)
	}
	getInitialState() {
		return {
			children:this.buildChildren(),
			selectedIndex:0
		} as TabGroupState
	}

	buildChildren() {
		const {Item, Components, update,Value} = this.props
		return Item.Children.map(c => {
			return {
				settings:c,
				Element:React.createElement(Components,Object.assign({},{Item:c,update,Value,key:c.Label}))
			}
		})
	}
	selectTab(i) {
		this.setState(state => state.selectedIndex = i)
	}
	render() {
		const {children,selectedIndex} = this.state
		return (
			<div className="tab-group" ref={ref => this.element = ref}>
				<ol className="tabs">
					{children.map((c,i) => (
						<li key={c.settings.Label} className={"tab "+(i == this.state.selectedIndex ? "selected" : "")} onClick={e => this.selectTab(i)}>
							{c.settings.Label}
						</li>
					))}
				</ol>
				<div className="tab-content">
					{children[selectedIndex].Element}
				</div>
			</div>
		)
	}
}
export default TabGroup;