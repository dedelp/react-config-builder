import * as React from 'react';
import ConfigItems, { ConfigType, importConfigItem } from './dataTypes'
import {ConfigItem} from './dataTypes/ConfigItem'
import Components from './components/'
import JSONTree from 'react-json-tree'
import * as util from './util/'

interface ConfigEditorState {
	Config: any;
	Item: any;
	Result:any;
}

interface ConfigEditorProps {
	Item:any;
	Value:any;
}

class Editor extends React.Component<ConfigEditorProps, ConfigEditorState> {
	constructor(props) {
		super(props)
		this.state = {
			Config:props.Item instanceof ConfigItem ? props.Item.export() : props.Item,
			Item: props.Item instanceof ConfigItem ? props.Item : importConfigItem(props.Item),
			Result: props.Value
		}
		this.updateResult = this.updateResult.bind(this)
	}
	componentWillMount() {
		this.setState(state => state.Result = util.inflate(Object.assign({},util.flatten(state.Result),state.Item.buildResult(state.Result))))
	}
	updateResult(update,rebuild) {
		const {Item,Result} = this.state
		var result = Object.assign({},util.flatten(Result),update)
		if(rebuild) result = Item.buildResult(result)
		this.setState(state => state.Result = util.inflate(result))
	}
	render() {
		const { Config, Item, Result} = this.state
		const { Value } = this.props
		return (
			<div className="app" ref="myRef">
				<div className="appSection configWrapper">
					<JSONTree data={Config} invertTheme={false} />
				</div>
				<div className="appSection componentsWrapper">
					<Components update={this.updateResult} Item={Item} Value={util.flatten(this.state.Result)}/>
				</div>
				<div className="appSection resultWrapper">
					<JSONTree data={Result} />
				</div>
			</div>
		);
	}
}

export default Editor