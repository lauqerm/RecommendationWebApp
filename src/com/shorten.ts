export const override = (value: any, overrideValue: any) => {
	return overrideValue === null || overrideValue === undefined
		? value
		: overrideValue
}

export const moneyFormatWholeVND = new Intl.NumberFormat('vi', {
	style: 'currency',
	currency: 'VND',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
}).format;