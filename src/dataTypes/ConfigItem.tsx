import {ConfigType} from './ConfigType'

export interface ConfigItemOptions {
	Label: string;
	Description?: string;
	Path: string;
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
	public Path: string ;
	public SubPath: string;
	Parent?: ConfigItem;

	constructor(type: ConfigType, options: ConfigItemOptions) {
		this.Type = type;
		this.Label = options.Label;
		this.Description = options.Description;
		this.Path = options.Path;
		if(options.Component) this.Component = options.Component;
	}
	public getPath(): string {
		return (this.SubPath ? this.SubPath : "")+this.Path;
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
			Path: this.Path,
			Label: this.Label,
			Description: this.Description,
			DefaultValue: this._DefaultValue,
			Component: this.Component
		});
		return item;
	}

}
