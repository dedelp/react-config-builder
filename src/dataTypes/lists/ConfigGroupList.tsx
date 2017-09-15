import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {ConfigGroup, ConfigGroupOptions} from '../ConfigGroup'
import {ConfigList, ConfigListOptions} from './ConfigList'


class ConfigGroupList extends ConfigList<ConfigGroup> {
	constructor(options: ConfigListOptions<ConfigGroup>) {
		super(Object.assign({}, options, { Type: ConfigType.groupList }));
	}
}

