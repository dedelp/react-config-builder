import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {ConfigGroup, ConfigGroupOptions} from '../ConfigGroup'
import {importConfigItem} from '../'

export interface ConfigEnumGroupOption {
	value: string;
	display?: string;
	Children: ConfigItem[];
}

export interface ConfigEnumGroupOptions extends ConfigGroupOptions {
	DefaultValue: string;
	Value?: string;
	Options: ConfigEnumGroupOption[];
}

export class ConfigEnumGroup extends ConfigGroup implements ConfigEnumGroupOptions {
	Options: ConfigEnumGroupOption[];
	Children: ConfigItem[];
	constructor(options: ConfigEnumGroupOptions) {
		super(options,ConfigType.enumGroup);
		this.Options = options.Options.map(o => ({
			value:o.value,
			display:o.display,
			Children:(o.Children||[]).map(c => c instanceof ConfigItem ? c : importConfigItem(Object.assign({},c)))
		}));
		this.DefaultValue = options.DefaultValue;
		this.DefaultComponent = 'EnumGroup';
	}
	getOptions(): ConfigEnumGroupOption[] {
		return this.Options.map(option => ({ value: option.value, display: option.display || option.value, Children:option.Children}))
	}
	public get Value(): string {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: string) {
		var option = this.Options.find(option => option.value == value)
		if (!option) {
			console.error(value + ' is not an accepted Value for"' + this.Label + '". Use one of:[' + this.Options.map(option => option.value).join(',') + ']');
			this._Value = this._DefaultValue;
			return;
		}
		this.Children = option.Children
		this._Value = value;
	}
	public get DefaultValue(): string {
		return this._DefaultValue;
	}
	public set DefaultValue(value: string) {
		var option = this.Options.find(option => option.value == value)
		if (!option) {
			console.error(value + ' is not an accepted DefaultValue for"' + this.Label + '". Use one of:[' + this.Options.map(option => option.value).join(',') + ']');
			return;
		}
		this.Children = option.Children
		this._DefaultValue = value;
	}
	public export() {
		return Object.assign({}, super.export(), { 
			Options: this.Options.map(o => ({
				value:o.value, 
				display: o.display || o.value, 
				Children: o.Children.map(c => c.export())
			}))
		})
	}
}
