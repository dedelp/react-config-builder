export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
	return o.reduce((res, key) => {
		res[key] = key;
		return res;
	}, Object.create(null));
}

export const ConfigType = strEnum([
	"number",
	"string",
	"boolean",
	"enum",
	"numberRange",
	"group",
	"list",
	"numberList",
	"stringList",
	"booleanList",
	"enumList",
	"groupList",
	"enumGroup"
])
export type ConfigType = keyof typeof ConfigType;