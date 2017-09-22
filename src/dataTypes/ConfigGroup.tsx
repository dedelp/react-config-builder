import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'
import {importConfigItem} from './'


export interface ConfigGroupOptions extends ConfigItemOptions {
	Children: ConfigItem[];
}

export class ConfigGroup extends ConfigItem implements ConfigGroupOptions {
	Children: ConfigItem[];
	constructor(options: ConfigGroupOptions) {
		super(ConfigType.group, options);
		this.Children = options.Children.map(c => c instanceof ConfigItem ? c : importConfigItem(c));
		this.DefaultComponent = 'Group';
		
	}
	public export() {
		return Object.assign({}, super.export(), { Children: this.Children.map(c => c.export())})
	}
	public buildResult(Value) {
		var result = {};
		this.Children.forEach(c => {
			Object.assign(result,c.buildResult(Value))
		})

		return result
	}
}
