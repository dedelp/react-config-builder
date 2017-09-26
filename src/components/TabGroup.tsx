import * as React from 'react';
import Group,{GroupProps,GroupState} from './Group'
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface TabGroupState extends GroupState{
	selectedIndex
}

 class TabGroup extends Group<GroupProps,TabGroupState> {
	element = null
	constructor(props) {
		super(props)
		this.state = {
			children:this.state.children,
			selectedIndex:0
		} as TabGroupState
		this.buildChildren = this.buildChildren.bind(this)
		this.selectTab = this.selectTab.bind(this)
	}
	selectTab(i) {
		this.setState(state => state.selectedIndex = i)
	}
	render() {
		const {children,selectedIndex} = this.state
		var width = (this.element || {}).offsetWidth || 300
		return (
			<div className="tab-group" ref={ref => this.element = ref}>
				{width > 300 ? (
					<ol className="tabs">
						{children.map((c,i) => (
							<li key={c.settings.Label} className={"tab "+(i == this.state.selectedIndex ? "selected" : "")} onClick={e => this.selectTab(i)}>
								{c.settings.Label}
							</li>
						))}
					</ol>
				) : (
					<select className="form-control" value={selectedIndex} onChange={e => this.selectTab(e.target.value)}>
						{children.map((c,i) => (
							<option key={i} value={i}>{c.settings.Label}</option>
						))}
					</select>
				)}
				<div className="tab-content">
					{children[selectedIndex] ? children[selectedIndex].Element : null}
				</div>
			</div>
		)
	}
}
export default TabGroup;