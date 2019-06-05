import _ from 'lodash'

export const isExist = (value: any) => {
	return value === null || value === undefined
		? false
		: true
}

export const override = (value: any, overrideValue: any) => {
	return overrideValue === null || overrideValue === undefined
		? value
		: overrideValue
}

export const validateChain = (value: any, keyChain: string[], defaultValue: any) => {
	const len = keyChain.length
	let nextValue = value
	if (value === null || value === undefined)
		return defaultValue
	for (let cnt = 0; cnt < len; cnt++) {
		nextValue = nextValue[keyChain[cnt]]
		if (nextValue === null || nextValue === undefined)
			return defaultValue
	}
	return nextValue
}

export const objectToArray = (obj: { [key: string]: any }) => {
	return Object.keys(obj).map((key) => {
		const pair: { [key: string]: any } = {}
		pair[`${key}`] = obj[key]
		return pair
	})
}

export const preservingMerge = (srcObj: any, $obj: any) => {
	const keys = Object.keys(srcObj)
	const obj: any = { ...srcObj }
	keys.map((key: string) => {
		if ($obj[key] !== undefined) obj[key] = $obj[key]
	})
	return obj
}

export const moneyFormatWholeVND = new Intl.NumberFormat('vi', {
	style: 'currency',
	currency: 'VND',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
}).format;