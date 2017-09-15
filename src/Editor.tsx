import * as React from 'react';
import ConfigItems, { ConfigType, importConfigItem } from './dataTypes'
import {ConfigItem} from './dataTypes/ConfigItem'
import Components from './components/'
import JSONTree from 'react-json-tree'

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
		this.setState(state => state.Result = Object.assign({},state.Result,state.Item.buildResult(state.Result)))
	}
	updateResult(update) {
		this.setState(state => state.Result = Object.assign({},state.Result,update))
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
					<Components update={this.updateResult} Item={Item} Value={Value}/>
				</div>
				<div className="appSection resultWrapper">
					<JSONTree data={Result} />
				</div>
			</div>
		);
	}
}

export default Editor