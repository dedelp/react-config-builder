import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'


export interface ConfigNumberOptions extends ConfigItemOptions {
	DefaultValue: number;
	Value?: number;

}

export class ConfigNumber extends ConfigItem {
	constructor(options: ConfigNumberOptions) {
		super(ConfigType.number, options);
		this.DefaultValue = options.DefaultValue
	}
	public get Value(): number {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: number) {
		this._Value = value;
	}
	public get DefaultValue(): number {
		return this._DefaultValue;
	}
	public set DefaultValue(value: number) {
		this._DefaultValue = value;
	}

}
