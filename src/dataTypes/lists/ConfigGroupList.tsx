import {ConfigItem,ConfigItemOptions} from '../ConfigItem'
import {ConfigType} from '../ConfigType'
import {ConfigGroup, ConfigGroupOptions} from '../ConfigGroup'
import {ConfigList, ConfigListOptions} from './ConfigList'
import {importConfigItem} from '../'

export interface ConfigGroupListOptions extends ConfigListOptions<ConfigGroup>
{
	Template: ConfigGroup;
	KeyPath: string;
}
export class ConfigGroupList extends ConfigList<ConfigGroup> {
	Template: ConfigGroup;
	KeyPath:string;
	update;

	constructor(options: ConfigGroupListOptions) {
		super(Object.assign({}, options, { Type: ConfigType.groupList }));
		this.Component = 'GroupList'
		this.Template = options.Template
		this.KeyPath = options.KeyPath
		this.update = () => {}
	}
	public validOption(obj) {
		return !(this.Strict && !this.Options.find(o => JSON.stringify(o) === JSON.stringify(obj)))
	}
	public createOption(obj) {
		if(!this.Template) return null
		if(!this.validOption(obj)) return null
		var option = importConfigItem(this.Template instanceof ConfigItem ? this.Template.export() : this.Template)
		var res = obj
		option.updateValues(obj,(ops) => res = Object.assign({},res,ops))
		option.Value=res
		return option
	}
	public export() {
		return Object.assign({}, super.export(), { 
			Template: this.Template.export(),
			KeyPath:this.KeyPath
		})
	}
	public updateValues(incoming,update) {
		var path = this.getPath()
		var newUpdate = update
		incoming = (incoming||{})[path] || []
		if(incoming.length > 0) this.Value=incoming
		this.buildList()
		this.Children.forEach((c,i) => 
			c.updateValues(incoming[i],(values) => 
				update(Object.keys(values || {}).reduce((res,key) => {
					res[path+'.'+i+'.'+key] = values[key]
					return res
				},{}))
			)
		)
	}
}

