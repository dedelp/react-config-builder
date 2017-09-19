import {ConfigEnum} from './dataTypes/ConfigEnum'
import {ConfigString} from './dataTypes/ConfigString'
import {ConfigNumber} from './dataTypes/ConfigNumber'
import {ConfigBoolean} from './dataTypes/ConfigBoolean'
import {ConfigGroup} from './dataTypes/ConfigGroup'
import {ConfigNumberRange} from './dataTypes/ranges/ConfigNumberRange'

export const enumSample = new ConfigEnum({
	"Path": "enumSample",
	"Label": "Test Enum",
	"Description": "Some information about the enum",
	"DefaultValue": "bar",
	"Options": [{ "value": "foo", "display": "this is foo" }, { "value": "bar" }]
})

export const stringSample = new ConfigString({
	"Path": "stringSample",
	"Label": "Test String",
	"Description": "Some information about the string",
	"DefaultValue": "test the foobar",
	"Matches": `test`
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
export const inheritPathGroupSample = new ConfigGroup({
	"Path": "group",
	"Label": "Group 2",
	"Description": "A group of config Items",
	"Children" : [
		numberSample,
		enumSample,
	]

})
export const tabGroupSample = new ConfigGroup({
	"Path": null,
	"Label": "Tab Group",
	"Description": "A group of config Items",
	"Component": "TabGroup",
	"Children" : [
		basicGroupSample,
		inheritPathGroupSample
	]
})