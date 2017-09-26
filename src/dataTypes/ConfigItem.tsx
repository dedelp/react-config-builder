import {ConfigType} from './ConfigType'
import * as util from '../util'

export interface ConfigItemOptions {
	Label: string;
	Description?: string;
	Path: string;
	Component?: string;
	SubPath?:string;
	Initial?:any;

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

	constructor(type: ConfigType, options: ConfigItemOptions) {
		this.Type = type;
		this.Label = options.Label;
		this.Description = options.Description;
		this.Path = options.Path;
		if(options.Component) this.Component = options.Component;
		this._Value = this.Path ? (options.Initial||{})[this.getPath()] : null
	}
	public getPath(): string {
		if(!this.Path || this.Path =="") return null
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
