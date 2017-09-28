import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'

export interface ConfigBooleanOptions extends ConfigItemOptions {
	DefaultValue: boolean;
	Value?: boolean;
}

export class ConfigBoolean extends ConfigItem implements ConfigBooleanOptions {
	constructor(options: ConfigBooleanOptions) {
		super(ConfigType.boolean, options);
		this.DefaultComponent = "BooleanInput";
	}
	public get Value(): boolean {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: boolean) {
		this._Value = value;
	}

}
