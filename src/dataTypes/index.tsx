import {ConfigNumber} from './ConfigNumber'
import {ConfigString} from './ConfigString'
import {ConfigEnum} from './ConfigEnum'
import {ConfigBoolean} from './ConfigBoolean'
import {ConfigNumberRange} from './ranges/ConfigNumberRange'
import {ConfigGroup} from './ConfigGroup'
import {ConfigList} from './lists/ConfigList'
import {ConfigType} from './ConfigType'
import {ConfigEnumGroup} from './groups/ConfigEnumGroup'
import {ConfigGroupList} from './lists/ConfigGroupList'
import {ConfigStringList} from './lists/ConfigStringList'

const DefaultConfigItems =  {
	number: ConfigNumber,
	string: ConfigString,
	enum: ConfigEnum,
	boolean: ConfigBoolean,
	numberRange: ConfigNumberRange,
	group: ConfigGroup,
	enumGroup: ConfigEnumGroup,
	groupList: ConfigGroupList,
	stringList: ConfigStringList
}

export {ConfigType};

export const importConfigItem = (incoming,configItems?) => {
	if(typeof incoming == 'string') incoming = JSON.parse(incoming)
	const {Type} = incoming;
	const ConfigItems = Object.assign({},DefaultConfigItems,configItems)
	const options = Object.assign({},incoming);
	delete options.Type;
	if(!ConfigItems[Type])
		throw(Type+" is not a valid ConfigType")
	return new ConfigItems[Type](options)
}

export default DefaultConfigItems