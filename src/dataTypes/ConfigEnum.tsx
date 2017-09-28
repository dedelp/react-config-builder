import {ConfigItem,ConfigItemOptions} from './ConfigItem'
import {ConfigType} from './ConfigType'

export interface ConfigEnumOption {
	value: string;
	display?: string;
}

export interface ConfigEnumOptions extends ConfigItemOptions {
	DefaultValue: string;
	Value?: string;
	Options: (ConfigEnumOption | string)[];
}

export class ConfigEnum extends ConfigItem implements ConfigEnumOptions {
	Options: ConfigEnumOption[];
	constructor(options: ConfigEnumOptions) {
		super(ConfigType.enum, options);
		this.Options = (options.Options||[]).map(o => typeof o === 'string' ? {value:o} : o);
		this.DefaultValue = options.DefaultValue
		this.DefaultComponent = 'EnumInput';
	}
	getOptions(): ConfigEnumOption[] {
		return this.Options.map(option => ({ value: option.value, display: option.display || option.value }))
	}
	public get Value(): string {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: string) {
		if (!this.Options.find(option => option.value == value)) {
			console.error(value + ' is not an accepted Value for"' + this.Label + '". Use one of:[' + this.Options.map(option => option.value).join(',') + ']');
			this._Value = this._DefaultValue;
			return;
		}
		this._Value = value;
	}
	public get DefaultValue(): string {
		return this._DefaultValue;
	}
	public set DefaultValue(value: string) {
		if(!this.Options) return
		if (!(this.Options||[]).find(option => option.value == value)) {
			console.error(value + ' is not an accepted DefaultValue for"' + this.Label + '". Use one of:[' + (this.Options||[]).map(option => option.value).join(',') + ']');
		}
		this._DefaultValue = value;
	}
	public export() {
		return Object.assign({}, super.export(), { Options: this.Options })
	}
}