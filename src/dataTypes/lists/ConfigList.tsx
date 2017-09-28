import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {ConfigGroup} from '../ConfigGroup'

export interface ConfigListOptions<T extends ConfigItem> extends ConfigItemOptions {
	DefaultValue: string[];
	Options?: any[];
	Ordered: boolean;
	Type?: ConfigType;

	Strict?: boolean;
}

export class ConfigList<T extends ConfigItem> extends ConfigItem implements ConfigListOptions<T> {
	Ordered: boolean;
	DefaultValue:  string[];
	Value: string[];
	Options?: any[];

	Children:T[];
	Strict:boolean;

	constructor(options: ConfigListOptions<T>) {
		super(options.Type || ConfigType.list,options);
		this.Ordered = options.Ordered
		this.Options = options.Options
		this.DefaultValue = options.DefaultValue

		this.Strict = !!options.Strict
		this.Children = []

		
	}
	public export() {
		return Object.assign({}, super.export(), { 
			Ordered:this.Ordered,
			Options: this.Options
		})
	}
	public buildList() {
		this.Children = []
		this.Value = (this.Value||[]).reduce((res,label,i) => {
			var child = this.createOption(label)	
			if(child) 
			{
				this.insertChildAtIndex(child,i)
				res.push(label)
			}
			return res
		},[])
	}
	public validOption(label) {
		return !(this.Strict && !~this.Options.indexOf(label))
	}
	public createOption(label): T {
		return null
	}
	public insertAtIndex(label:string,index:number):any {
		this.Value.splice(index,0,label)
		var child = this.createOption(label)
		if(child) {
			this.insertChildAtIndex(child,index)
			return child
		}
	}
	public insertChildAtIndex(child:T,i:number) {
		if(!child) return
		if(this.getPath())
		{
			var childPath = child.getPath()
			if(childPath)
				child.Path = childPath.startsWith(this.getPath()) ? childPath : this.getPath()+(childPath ? ('.'+i+'.'+child.getPath()) : '')
		}
		this.Children.splice(i,0,child)
	}
	public removeChildAtIndex(i:number) {
		if(i >= this.Value.length) return
		this.Value.splice(i,1)
		this.Children.splice(i,1)
	}
	public moveChild(orig:number,i:number) {
		if(i >= this.Value.length || orig >= this.Value.length || i < 0 || orig < 0 || i === orig) return
		var val = this.Value.splice(orig,1)[0]
		var child = this.Children.splice(orig,1)[0]
		this.Value.splice(i,0,val)
		this.Children.splice(i,0,child)
		
	}
	public updateValues(incoming,update) {
		var path = this.getPath()
		var newUpdate = update
		incoming = (incoming||{})[path] || []
		if(incoming.length > 0) this.Value=incoming
		this.buildList()
		update({[path]:this.Value})
	}
}
