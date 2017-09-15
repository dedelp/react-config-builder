import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'

export interface ConfigRangeOptions<T> extends ConfigItemOptions {
	DefaultValue: T;
	Value?: T;
	MinValue: T;
	MaxValue: T;
	Compare?: (a: T, b: T) => any;
}

export class ConfigRange<T> extends ConfigItem implements ConfigRangeOptions<T> {
	MinValue: T;
	MaxValue: T;
	DataType: ConfigType;
	Compare?: (a: T, b: T) => number;
	constructor(dataType,options: ConfigRangeOptions<T>) {
		super(dataType, options);
		this.DataType = dataType;
		this.MinValue = options.MinValue;
		this.MaxValue = options.MaxValue;
		this.Compare = options.Compare;
		this.DefaultValue = options.DefaultValue;
	}
	public get Value(): T {
		return this._Value || this._DefaultValue;
	}
	public set Value(value: T) {
		var valid = true;
		if (this.Compare) {
			if (~this.Compare.apply(null, [this.MinValue, value]) || ~this.Compare.apply(null, [value, this.MaxValue]))
				valid = false;
		} else {
			if (this.MinValue > value || value > this.MaxValue)
				valid = false;
		}
		if (!valid) {
			throw ("The value (" + value.toString() + ") does not fall within range [" + this.MinValue + ", " + this.MaxValue + "]");
		}
		this._Value = value;
	}
	public get DefaultValue(): T {
		return this._DefaultValue;
	}
	public set DefaultValue(value: T) {
		this._DefaultValue = value;
	}
	public export() {
		return Object.assign({}, super.export(), {
			MinValue: this.MinValue,
			MaxValue: this.MaxValue,
			DataType: this.DataType,
			Compare: this.Compare
		})
	}
}