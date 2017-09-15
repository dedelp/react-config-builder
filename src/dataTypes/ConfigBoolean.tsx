import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'

export interface ConfigBooleanOptions extends ConfigItemOptions {
	DefaultValue: boolean;
	Value?: boolean;
}

export class ConfigBoolean extends ConfigItem implements ConfigBooleanOptions {
	constructor(options: ConfigBooleanOptions) {
		super(ConfigType.boolean, options);
		this.DefaultValue = options.DefaultValue;
	}
	public get Value(): boolean {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: boolean) {
		this._Value = value;
	}
	public get DefaultValue(): boolean {
		return this._DefaultValue;
	}
	public set DefaultValue(value: boolean) {
		this._DefaultValue = value;
	}
}
