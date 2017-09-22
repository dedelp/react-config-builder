import * as React from 'react';
import Group from './Group'
import {ConfigGroup} from '../dataTypes/ConfigGroup'


 class GroupWell extends Group {
	constructor(props) {
		super(props)
		this.state = {
			children:this.buildChildren()
		}
		this.buildChildren = this.buildChildren.bind(this)
	}

	render() {
		return (
			<div className="group-well">
				{this.state.children}

			</div>
		)
	}
}
export default GroupWell;