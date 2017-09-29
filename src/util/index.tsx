export const flatten = (object, separator = '.') => {
	return Object.assign({}, ...function _flatten(child, path = []) {
		return [].concat(...Object.keys(child).map(key => typeof child[key] === 'object'
			? _flatten(child[key], path.concat([key]))
			: ({ [path.concat([key]).join(separator)]: child[key] })
		));
	}(object));
}
export const inflate = (object, separator = '.') => {
	var result = {}
	Object.keys(object).forEach(k => {
		k.split(separator).reduce((res, curr, i, arr) => {
			if (i === arr.length - 1) {
				res[curr] = object[k]
			} else {
				if (!res[curr]) res[curr] = isNaN(Number(arr[i + 1])) ? {} : []
				if (Array.isArray(res[curr]) && isNaN(Number(arr[i + 1]))) res[curr] = res[curr].reduce((a, b, i) => { a[i] = b; return a }, {})
				res = res[curr]
			}
			return res
		}, result)
	})
	return result
}
export const getFromPath = (obj,path) => {
	return path.split('.').reduce((res,curr) => res[curr] ? res[curr] : {},obj)
}