import * as React from 'react';
import ConfigItems, { ConfigType, importConfigItem } from './dataTypes'
import {ConfigItem} from './dataTypes/ConfigItem'
import Components from './components/'
import JSONTree from 'react-json-tree'
import * as util from './util/'

interface ConfigEditorState {
	Config: any;
	Item: any;
	Initial:any;
	Result:any;
	updated:any;
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
			Initial: Object.assign({},props.Value),
			Result: Object.assign({},props.Value),
			updated: new Date()
		}
		this.updateResult = this.updateResult.bind(this)
		this.updateConfig = this.updateConfig.bind(this)
		this.updateInitial = this.updateInitial.bind(this)
	}
	componentWillMount() {
		this.setState(state => {
			state.Result = util.flatten(state.Initial)
		})
	}
	updateResult(update,rebuild) {
		const {Item,Result} = this.state
		console.log('updateResult',update)
		var result = Object.assign({},util.flatten(Result),update)
		this.setState(state => state.Result = util.inflate(result))
	}
	updateConfig(e) {
		var config = JSON.parse(e.target.value)
		this.setState(state => {
			state.Config = Object.assign({},config)
			state.Item = importConfigItem(Object.assign({},config))
			state.Result = util.flatten(Object.assign({},state.Initial))
			state.updated = new Date()
		})
	}
	updateInitial(e) {
		var initial = JSON.parse(e.target.value) 
		this.setState(state => {
			state.Initial = initial
			state.Result = util.flatten(Object.assign({},initial))
			state.updated=new Date()
		})	
	}
	render() {
		const { Config, Item, Result} = this.state
		const { Value } = this.props
		return (
			<div className="app" key={this.state.updated} ref="myRef">
				<div className="appSection configWrapper" style={{display:'flex',flexDirection:'column'}}>
					<div style={{height:'50%'}}>	
						<textarea key={this.state.updated+'-1'} onBlur={this.updateConfig} defaultValue={JSON.stringify(this.state.Config,undefined,2)} />
					</div>
					<div style={{height:'50%'}}>
						<textarea key={this.state.updated+'-2'} onBlur={this.updateInitial} defaultValue={JSON.stringify(this.state.Initial,undefined,2)} />
					</div>
				</div>
				<div className="appSection componentsWrapper">
					<Components key={this.state.updated+'-3'} update={this.updateResult} Item={Item} Value={util.flatten(this.state.Result)}/>
				</div>
				<div className="appSection resultWrapper">
					<JSONTree data={Result} />
				</div>
			</div>
		);
	}
}

export default Editor