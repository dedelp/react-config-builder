import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'

interface GroupProps {
	Item,
	update,
	Components,
	Value
}
interface GroupState {
	children,
	options,
	selected
}

 class Group extends React.Component<GroupProps, GroupState> {
	constructor(props) {
		super(props)
		this.state = {
			children:this.buildChildren(),
			options: this.buildOptions(),
			selected:null
		}
		this.buildChildren = this.buildChildren.bind(this)
		this.buildOptions = this.buildOptions.bind(this)
		this.selectItem = this.selectItem.bind(this)
		this.addItem = this.addItem.bind(this)
	}

	buildChildren() {
		const {Item, Components, update,Value} = this.props
		return Item.Children.map(c => React.createElement(Components,Object.assign({},{Item:c,update,Value,key:c.Label})) )
	}
	buildOptions() {
		const {Item} = this.props
		var options = {}
		;(Item.Options||[]).forEach(o => {
			if(!(Item.Children||[]).find(c => c.Label == o.Label))
				options[o.Label] = o
		})
		return options
	}
	selectItem(i) {
		this.setState(state => state.selected=i)
	}
	addItem(e) {
		var index = 0
		this.props.Item.insertAtIndex(e.target.value,index)
		this.setState(state => {
			state.children = this.buildChildren()
			state.options = this.buildOptions()
			state.selected = index
		})
	}
	render() {
		return (
			<div className="grouplist">
				<div className="grouplist-option-well">
					<ul className="grouplist-options">
						{(this.props.Item.Values||[]).map((c,i) => 
							<li key={c} className={this.state.selected===i ? "selected" : ""} onClick={e => this.selectItem(i)} >
								{c}
							</li>
						)}
					</ul>
					<select value="Add" onChange={this.addItem}>
						<option value="Add" disabled >Add</option>
						{Object.keys(this.state.options||{}).map(key => 
							<option key={key} value={key}>{key}</option>
						)}
					</select>
				</div>
				<div className="grouplist-item-well">
					{~this.state.selected ? (
						<div>
							{this.state.children[this.state.selected]}
						</div>
					) : (
						<span>
							Select an item on the left to edit
						</span>
					)}
				</div>

			</div>
		)
	}
}
export default Group;