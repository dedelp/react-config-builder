import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'

export interface ConfigStringOptions extends ConfigItemOptions {
	DefaultValue: string;
	Value?: string;
	Matches?: string;
}
export class ConfigString extends ConfigItem implements ConfigStringOptions {
	Matches?: string;
	constructor(options: ConfigStringOptions) {
		super(ConfigType.string, options);
		this.Matches = options.Matches;
		this.DefaultValue = options.DefaultValue;
		this.DefaultComponent = 'StringInput';
	}
	public get Value(): string {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: string) {
		this._Value = value;
	}
	public get DefaultValue(): string {
		return this._DefaultValue;
	}
	public set DefaultValue(value: string) {
		this._DefaultValue = value;
	}
}
