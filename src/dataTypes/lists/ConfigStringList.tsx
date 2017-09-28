import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {ConfigString, ConfigStringOptions} from '../ConfigString'
import {ConfigList, ConfigListOptions} from './ConfigList'


export class ConfigStringList extends ConfigList<ConfigString> {
	constructor(options: ConfigListOptions<ConfigString>) {
		super(Object.assign({}, options, { Type: ConfigType.stringList }));
		this.Component = 'StringList'
	}
	public createOption(label) {
		if(!this.validOption(label)) return null
		var option = new ConfigString({
			Path:null,
			Label:null,
			Description:null,
			DefaultValue:""
		})
		option.Value=label
		return option
	}
}

