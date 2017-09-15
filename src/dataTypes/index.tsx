import {ConfigNumber} from './ConfigNumber'
import {ConfigString} from './ConfigString'
import {ConfigEnum} from './ConfigEnum'
import {ConfigBoolean} from './ConfigBoolean'
import {ConfigNumberRange} from './ranges/ConfigNumberRange'
import {ConfigGroup} from './ConfigGroup'
import {ConfigList} from './lists/ConfigList'
import {ConfigType} from './ConfigType'

const ConfigItems =  {
	number: ConfigNumber,
	string: ConfigString,
	enum: ConfigEnum,
	boolean: ConfigBoolean,
	numberRange: ConfigNumberRange,
	group: ConfigGroup
}

export {ConfigType};

export const importConfigItem = incoming => {
	const {Type} = incoming;
	const options = Object.assign({},incoming);
	delete options.Type;
	return new ConfigItems[Type](options)
}

export default ConfigItems