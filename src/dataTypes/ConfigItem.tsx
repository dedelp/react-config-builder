import {ConfigType} from './ConfigType'

export interface ConfigItemOptions {
	Label: string;
	Description?: string;
	Path: string | (() => string);
	Component?: string;
}

export class ConfigItem implements ConfigItemOptions {
	Label: string;
	Description: string;
	Value: any;
	_Component?: string;

	Type: ConfigType;
	DefaultComponent: string;
	protected _Value?: any;
	protected _DefaultValue: any;
	protected _Path: string | (() => string);
	Parent?: ConfigItem;

	constructor(type: ConfigType, options: ConfigItemOptions) {
		this.Type = type;
		this.Label = options.Label;
		this.Description = options.Description;
		this.Path = options.Path;
		if(options.Component) this.Component = options.Component;
	}
	public set Path(path: string | (() => string)) {
		this._Path = path;
	}
	public get Path(): string | (() => string) {
		return typeof this._Path == 'function' ? this._Path.apply(this) : this._Path;
	}
	public getPath(): string {
		return typeof this._Path == 'function' ? this._Path.apply(this) : this._Path;
	}
	public get Component(): string {
		return this._Component ? this._Component : this.DefaultComponent
	}
	public set Component(Component: string) {
		this._Component = Component
	}
	public export() {
		let item = Object.assign({}, {
			Type: this.Type,
			Path: this._Path,
			Label: this.Label,
			Description: this.Description,
			DefaultValue: this._DefaultValue,
			Component: this.Component
		});
		return item;
	}
	public buildResult(Value) {
		var obj = this.flatten(Value)
		if(obj[this.getPath()]) this.Value=obj[this.getPath()]
		return {[this.getPath()]:this.Value}
	}
	public flatten = (object, separator = '.') => {
		return Object.assign({}, ...function _flatten(child, path = []) {
			return [].concat(...Object.keys(child).map(key => typeof child[key] === 'object'
				? _flatten(child[key], path.concat([key]))
				: ({ [path.concat([key]).join(separator)]: child[key] })
			));
		}(object));
	}
}
