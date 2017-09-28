import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'


export interface ConfigNumberOptions extends ConfigItemOptions {
	DefaultValue: number;
	Value?: number;

}

export class ConfigNumber extends ConfigItem {
	constructor(options: ConfigNumberOptions) {
		super(ConfigType.number, options);
		this.DefaultComponent = 'NumberInput';
	}
	public get Value(): number {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: number) {
		this._Value = value;
	}
}
