import {ConfigEnum} from './dataTypes/ConfigEnum'
import {ConfigString} from './dataTypes/ConfigString'
import {ConfigNumber} from './dataTypes/ConfigNumber'
import {ConfigBoolean} from './dataTypes/ConfigBoolean'
import {ConfigGroup} from './dataTypes/ConfigGroup'
import {ConfigNumberRange} from './dataTypes/ranges/ConfigNumberRange'
import {ConfigEnumGroup} from './dataTypes/groups/ConfigEnumGroup'
import {ConfigGroupList} from './dataTypes/lists/ConfigGroupList'
import {ConfigStringList} from './dataTypes/lists/ConfigStringList'

export const enumSample = new ConfigEnum({
	"Path": "enumSample",
	"Label": "Test Enum",
	"Description": "Some information about the enum",
	"DefaultValue": "bar",
	"Options": [{ "value": "foo", "display": "this is foo" }, { "value": "bar" }, "baz"]
})

export const stringSample = new ConfigString({
	"Path": "stringSample",
	"Label": "Test String",
	"Description": "Some information about the string",
	"DefaultValue": "test the foobar",
	"Matches": `test`,
	"NotIn":["Tester","Test man"]
})

export const numberSample = new ConfigNumber({
	"Path": "numberSample",
	"Label": "Test Number",
	"Description": "Some information about the number",
	"DefaultValue": 100
})

export const boolSample = new ConfigBoolean({
	"Path": "boolSample",
	"Label": "Test Boolean",
	"Description": "Some information about the boolean",
	"DefaultValue": false
})

export const numberRangeSample = new ConfigNumberRange({
	"Path": "numberRangeSample",
	"Label": "Test Number Range",
	"Description": "Some information about the string",
	"DefaultValue": 50,
	"MinValue": 1,
	"MaxValue": 100,
	"Step":0.1

})

export const basicGroupSample = new ConfigGroup({
	"Path": null,
	"Label": "Group",
	"Description": "A group of config Items",
	"Children" : [
		stringSample,
		numberRangeSample,
		boolSample
	]

})
export const stringListSample = new ConfigStringList({
	"Path":"strings",
	"Label":"Strings",
	"Description":"A List of strings",
	"Ordered": true,
	"Options":["test1","test2","test3","test4","test5"],
	"DefaultValue": ["test3","test1","test5"],
	"Strict":false
})
export const inheritPathGroupSample = new ConfigGroup({
	"Path": "group",
	"Label": "Group 2",
	"Description": "A group of config Items",
	"Children" : [
		stringListSample,
	],
	"Component":"GroupWell"

})

export const configEnumGroup = new ConfigEnumGroup({
	"Path": "enumGroup",
	"Label": "Type",
	"Description": "Enum group",
	"Options" : [
		{
			"value":"Test",
			"display":"Test",
			"Children":[
				numberRangeSample,
				enumSample
			]
		},
		{
			"value":"Test2",
			"display":"Test2",
			"Children":[
				numberSample
			]
		}
	],
	"DefaultValue": "Test"
})

export const tabGroupSample = new ConfigGroup({
	"Path": null,
	"Label": "Tab Group",
	"Description": "A group of config Items",
	"Component": "TabGroup",
	"Children" : [
		inheritPathGroupSample,
		configEnumGroup
	]
})

export const groupListSample =  new ConfigGroupList({
	"Path":"rows",
	"Label":"Rows",
	"Description":"A List of rows",
	"Ordered": true,
	"Template": new ConfigGroup({
		"Path":"",
		"Label":"",
		"Description":"",
		"Children":[
			new ConfigString({
				"Path":"display",
				"Label":"Name",
				"Description":"",
				"DefaultValue":"Number 1"
			}),
			new ConfigNumber({
				"Path":"width",
				"Label":"Width",
				"Description":"Width of the element in pixels",
				"DefaultValue":10
			})
		]
	}),
	"Options":[{"display":"col1","width":10},{"display":"col2","width":20}],
	"KeyPath":"display",
	"DefaultValue": ["Number 1"]
})