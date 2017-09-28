import * as React from 'react';
import {ConfigStringList} from '../dataTypes/lists/ConfigStringList'
import Component, {ComponentProps} from './Component'

interface StringListProps extends ComponentProps {
	Item:ConfigStringList
}

interface StringListState {
	children,
	selected
}

 class StringList extends Component<StringListProps, StringListState> {
	constructor(props) {
		super(props)
		this.state = {
			children:this.buildChildren(props),
			selected:null
		}
		this.buildChildren = this.buildChildren.bind(this)
		this.selectItem = this.selectItem.bind(this)
		this.addItem = this.addItem.bind(this)
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
			res[key.startsWith(path) ? key : (path+'.'+i)] = items[key]
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
				Value: ((Value||{})[path]||{})[i],
				key:c.Label,
				hasParent:true
			})
			return {
				settings:c,
				Element:React.createElement(Components,props)
			}
		})
	}

	selectItem(i) {
		this.setState(state => state.selected=i)
	}
	addItem(e) {
		var index = 0
		this.props.Item.insertAtIndex(e.target.value,index)
		this.props.update({[this.props.Item.getPath()]:this.props.Item.Value})
		this.setState(state => {
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
		var options = Item.Options.reduce((res,curr) => {
			if(!~Item.Value.indexOf(curr)) res.push(curr)
			return res
		},[])
		var hasOptions = options.length > 0
		return (
			<div className="grouplist">
				<div className="grouplist-option-well">
					<ul className={"grouplist-options "+(hasOptions?"with-footer":"")}>
						{(Item.Value||[]).map((c,i,arr) => 
							<li key={c+i} className={selected===i ? "selected" : ""} onClick={e => this.selectItem(i)} >
								<div className="option-remove" onClick={e => this.removeItem(e,i)}>
									&times; 
								</div>
								<span className="option-key" title={c}>
									{c}
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
							{(options||[]).map(key => 
								<option key={key} value={key}>{key}</option>
							)}
						</select>
					: null }
				</div>
				<div className="grouplist-item-well">
					{selected || selected == 0 ? (
						<div key={selected}>
							{children[selected] ? children[selected].Element : null}
						</div>
					) : null}
				</div>

			</div>
		)
	}
}
export default StringList;