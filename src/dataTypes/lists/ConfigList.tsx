import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {importConfigItem} from '../'

export interface ConfigListOptions<T extends ConfigItem> extends ConfigItemOptions {
	Values: string[];
	Options?: ConfigItem[];
	Ordered: boolean;
	Type?: ConfigType;
}

export class ConfigList<T extends ConfigItem> extends ConfigItem implements ConfigListOptions<T> {
	Values: string[];
	Ordered: boolean;
	Options?: T[];
	Children: T[];
	constructor(options: ConfigListOptions<T>) {
		super(options.Type || ConfigType.list, options);
		this.Ordered = options.Ordered
		this.Values = options.Values
		this.Options = options.Options.map(c => c instanceof ConfigItem ? c : importConfigItem(c));
		this.Children = []
		;(this.Values||[]).map((label,i) => {
			var child = this.findOption(label)
			this.insertChildAtIndex(child,i)
		})
	}
	public export() {
		return Object.assign({}, super.export(), { Values: this.Children.map(c => c.export()),Options: this.Children.map(c => c.export())})
	}
	public findOption(key:string) {
		return (this.Options||[]).find(o => o.Label === key)
	}
	public addOption(option:T) {
		this.Options.push(option)
	}
	public insertAtIndex(label:string,index:number) {
		this.Values.splice(index,0,label)
		var child = this.findOption(label)
		this.insertChildAtIndex(child,index)
	}
	public insertChildAtIndex(child:T,i:number) {
		if(this.getPath())
		{
			var childPath = child.getPath()
			child.Path = childPath.startsWith(this.getPath()) ? childPath : this.getPath()+(childPath ? ('.'+i+'.'+child.getPath()) : '')
		}
		this.Children.splice(i,0,child)
		return child
	}
	/*public removeValueAtIndex(index:number):T {
		return this.Values.splice(index,1)[0]
	}
*/	
}
