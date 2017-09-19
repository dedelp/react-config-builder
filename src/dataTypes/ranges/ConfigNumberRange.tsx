import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {ConfigRange,ConfigRangeOptions} from './ConfigRange'

export interface ConfigNumberRangeOptions extends ConfigRangeOptions<number> {
	Step?: number;
}

export class ConfigNumberRange extends ConfigRange<number> implements ConfigRangeOptions<number> {
	Step?: number;
	constructor(options: ConfigNumberRangeOptions) {
		super(ConfigType.numberRange, options);
		this.Step = options.Step;
		this.DefaultComponent = 'NumberRangeInput';
	}
	public export() {
		return Object.assign({}, super.export(), { Step: this.Step })
	}
}