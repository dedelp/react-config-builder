import * as React from 'react';
import {ConfigGroup} from '../dataTypes/ConfigGroup'
import {ConfigGroupList} from '../dataTypes/lists/ConfigGroupList'
import Component, {ComponentProps} from './Component'

interface GroupListProps extends ComponentProps {
	Item:ConfigGroupList
}

interface GroupListState {
	children,
	options,
	selected
}

 class GroupList extends Component<GroupListProps, GroupListState> {
	constructor(props) {
		super(props)
		this.state = {
			children:this.buildChildren(props),
			options: this.buildOptions(),
			selected:null
		}
		this.buildChildren = this.buildChildren.bind(this)
		this.buildOptions = this.buildOptions.bind(this)
		this.selectItem = this.selectItem.bind(this)
		this.addItem = this.addItem.bind(this)
		this.moveItemDown = this.moveItemDown.bind(this)
		this.moveItemUp = this.moveItemUp.bind(this)
		this.update = this.update.bind(this)
	}
	componentWillUpdate(nextProps,nextState) {
		super.componentWillUpdate(nextProps,nextState)
		nextState.children=this.buildChildren(nextProps)
	}
	update(items,i) {
		const {Item,update} = this.props
		const path = Item.getPath()
		update(Object.keys(items).reduce((res,key) => {
			res[key.startsWith(path) ? key : (path+'.'+i+'.'+key)] = items[key]
			return res
		},{}))
	}
	buildChildren(props) {
		const {Item, Components, update,Value} = props
		var path = Item.getPath()
		return Item.Children.map((c,i) => {
			var props = Object.assign({},{
				Item:c,
				update: (values) => this.update(values,i),
				Value: (Value[path]||[])[i]||{},
				key:c.Label,
				hasParent:true
			})
			return {
				settings:c,
				Element:React.createElement(Components,props)
			}
		})
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
		const {Item,update} = this.props
		var index = 0
		var obj = Item.Options[e.target.value]
		var child = Item.insertAtIndex(obj,index)
		var result = {}
		child.updateValues({},(values) => Object.assign(result,values))
		update({[Item.getPath()]:Item.Value})
		this.setState(state => {
			state.children = this.buildChildren(this.props)
			state.selected = index
		})
	}
	removeItem(e,i) {
		e.preventDefault()
		e.stopPropagation()
		this.props.Item.removeChildAtIndex(i)
		this.props.update({[this.props.Item.getPath()]:this.props.Item.Value})	
		this.setState(state => {
			state.selected = null
		})	
	}
	moveItemUp(e,i) {
		e.preventDefault()
		e.stopPropagation()
		this.props.Item.moveChild(i,i-1)
		this.props.update({[this.props.Item.getPath()]:this.props.Item.Value})	
		this.setState(state => {state.selected = null})
	}
	moveItemDown(e,i) {
		e.preventDefault()
		e.stopPropagation()
		this.props.Item.moveChild(i,i+1)
		this.props.update({[this.props.Item.getPath()]:this.props.Item.Value})	
		this.setState(state => {state.selected = null})
	}
	render() {
		const {Item} = this.props
		const {children,selected,} = this.state
		var options = Item.Options
		var hasOptions = options.length > 0
		return (
			<div className="grouplist">
				<div className="grouplist-option-well">
					<ul className={"grouplist-options "+(hasOptions?"with-footer":"")}>
						{(Item.Value||[]).map((c,i,arr) => 
							<li key={c[Item.KeyPath]+i} className={selected===i ? "selected" : ""} onClick={e => this.selectItem(i)} >
								<div className="option-remove" onClick={e => this.removeItem(e,i)}>
									&times; 
								</div>
								<span className="option-key" title={c[Item.KeyPath]}>
									{c[Item.KeyPath]}
								</span>
								<div className="option-move">
									{i < arr.length-1 ? 
										<div onClick={e => this.moveItemDown(e,i)}>&#9660;</div>
									: null }
									{i > 0 ?
										<div onClick={e => this.moveItemUp(e,i)}>&#9650;</div> 
									: null }
								</div>
							</li>
						)}
					</ul>
					{hasOptions ? 
						<select value="Add" onChange={this.addItem}>
							<option value="Add" disabled >Add</option>
							{(options||[]).map((obj,i) => 
								<option key={obj[Item.KeyPath]} value={i}>{obj[Item.KeyPath]}</option>
							)}
						</select>
					: null }
				</div>
				<div className="grouplist-item-well">
					{selected || selected == 0 ? (
						<div key={selected}>
							{children[selected] ? children[selected].Element : null}
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
export default GroupList;