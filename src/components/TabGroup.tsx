import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface TabGroupProps {
	Item,
	update,
	Components,
	Value
}
interface TabGroupState {
	children,
	selectedIndex
}

 class TabGroup extends React.Component<TabGroupProps, TabGroupState> {
	element = null
	constructor(props) {
		super(props)
		this.state = {
			children:[],
			selectedIndex:0
		}
		this.buildChildren = this.buildChildren.bind(this)
		this.selectTab = this.selectTab.bind(this)
	}
	componentDidMount() {
		this.setState(state => state.children = this.buildChildren())
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
		if(!this.element) return <div className="tabgroup" ref={ref => this.element = ref} />
		var width = (this.element || {}).offsetWidth
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
					{this.state.children[this.state.selectedIndex].Element}
				</div>
			</div>
		)
	}
}
export default TabGroup;