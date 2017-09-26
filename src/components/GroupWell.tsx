import * as React from 'react';
import Group,{GroupProps,GroupState} from './Group'
import {ConfigGroup} from '../dataTypes/ConfigGroup'


 class GroupWell extends Group<GroupProps,GroupState> {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="group-well">
				{this.state.children.map(c => c.Element)}
			</div>
		)
	}
}
export default GroupWell;