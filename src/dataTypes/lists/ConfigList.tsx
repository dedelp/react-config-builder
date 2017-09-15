import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'

export interface ConfigListOptions<T> extends ConfigItemOptions {
	Children: T[];
	Type?: ConfigType;
}

export class ConfigList<T> extends ConfigItem implements ConfigListOptions<T> {
	Children: T[];
	constructor(options: ConfigListOptions<T>) {
		super(options.Type || ConfigType.list, options);
		this.Children = options.Children;
	}
}