import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'

export interface ConfigStringOptions extends ConfigItemOptions {
	DefaultValue: string;
	Value?: string;
	Matches?: string;
	NotIn?: string[];
}
export class ConfigString extends ConfigItem implements ConfigStringOptions {
	Matches?: string;
	NotIn?: string[];
	constructor(options: ConfigStringOptions) {
		super(ConfigType.string, options);
		this.Matches = options.Matches;
		this.NotIn = options.NotIn;
		this.DefaultComponent = 'StringInput';
	}
	public get Value(): string {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: string) {
		if(~(this.NotIn||[]).indexOf(value))
			throw("The value is not allowed")	
		if(this.Matches && this.Matches !== '' && !value.match(new RegExp(this.Matches)))
			throw("The value does not match the required format")
		this._Value = value
	}
}
