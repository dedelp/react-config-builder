import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'
import {importConfigItem} from './'
import * as util from '../util/'


export interface ConfigGroupOptions extends ConfigItemOptions {
	Children?: ConfigItem[];
}

export class ConfigGroup extends ConfigItem implements ConfigGroupOptions {
	Children: ConfigItem[];
	constructor(options: ConfigGroupOptions, type?: ConfigType) {
		super(type || ConfigType.group, options);
		this.Children = (options.Children||[]).map(c => c instanceof ConfigItem ? c : importConfigItem(c));
		this.DefaultComponent = 'Group';
	}
	public updateValues(incoming,update) {
		var path = this.getPath()
		var newUpdate = update
		if(path && path !== "")
		{
			incoming = util.getFromPath(incoming,path)
			newUpdate=(values) => update(Object.keys(values || {}).reduce((res,key) => {
				res[path+'.'+key] = values[key]
				return res
			},{}))
		}
		this.Children.forEach(c => c.updateValues(incoming,newUpdate))

	}
	public export() {
		return Object.assign({}, super.export(), { Children: this.Children.map(c => c.export())})
	}
}
