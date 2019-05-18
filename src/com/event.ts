import { ChangeEvent } from 'react'

export type RetrieveInputParam = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
export type RetrieveInputProps = {
	checked: boolean,
	value: { [k: string]: string },
	rawValue: string,
	e: RetrieveInputParam
}
const retrieveInput = (e: RetrieveInputParam, paramName:string = 'name'): RetrieveInputProps => {
	const { value: _value } = e.currentTarget
	let checked = false
	if ('checked' in e.currentTarget)
		checked = e.currentTarget.checked
	const name = e.currentTarget.getAttribute(paramName) as string
	let value: any = {}
	value[name] = _value
	return {
		checked,
		value,
		e,
		rawValue: _value,
	}
}

export {
	retrieveInput
}