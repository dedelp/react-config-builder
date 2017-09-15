import {ConfigEnum} from './dataTypes/ConfigEnum'
import {ConfigString} from './dataTypes/ConfigString'
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
	"Path": "stringSample",
	"Label": "Group",
	"Description": "A group of config Items",
	"Children" : [
		stringSample,
		enumSample,
		numberRangeSample
	]

})