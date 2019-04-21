export const override = (value: any, overrideValue: any) => {
	return overrideValue === null || overrideValue === undefined
		? value
		: overrideValue
}

export const objectToArray = (obj: { [key: string]: any }) => {
	return Object.keys(obj).map((key) => {
		const pair:{ [key: string]: any } = {}
		pair[`${key}`] = obj[key]
		return pair
	})
}

export const moneyFormatWholeVND = new Intl.NumberFormat('vi', {
	style: 'currency',
	currency: 'VND',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
}).format;