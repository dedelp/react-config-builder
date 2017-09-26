import * as React from 'react';
import Group,{GroupProps,GroupState} from './Group'
import {ConfigGroup} from '../dataTypes/ConfigGroup'


 class GroupWell extends Group<GroupProps,GroupState> {

	render() {
		return (
			<div className="group-well">
				{this.state.children}

			</div>
		)
	}
}
export default GroupWell;