import React, { FormEvent } from 'react'

type PriceFilterProps = {
	onInput: (e: FormEvent<HTMLInputElement>) => void,
	value: number
}
export const PriceType = [
	'Tiết kiệm',
	'Bình dân',
	'Trung bình',
	'Rộng rãi',
	'Xa hoa'
]
const PriceFilter = (props: PriceFilterProps) => {
	const { onInput, value } = props
	return (
		<React.Fragment>
			<label>{PriceType[value - 1]}</label>
			<input type="range" min="1" max="5" value={value}
				onInput={onInput} onChange={onInput} />
		</React.Fragment>
	)
}

export default PriceFilter