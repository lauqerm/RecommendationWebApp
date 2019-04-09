export const override = (value: any, overrideValue: any) => {
	return overrideValue === null || overrideValue === undefined
		? value
		: overrideValue
}