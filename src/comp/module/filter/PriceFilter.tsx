import React, { FormEvent } from 'react'
import { InputWithLabel } from '../../atom/form'
import InputRange, { Range } from 'react-input-range'
import 'react-input-range/lib/css/index.css'

type PriceFilterProps = {
	onInput?: (e: FormEvent<HTMLInputElement>) => void,
	onChange: (value: number | Range) => void,
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
	const { onInput, value, onChange } = props
	return (
		<React.Fragment>
			<InputWithLabel
				formId="header"
				id="price"
				label={PriceType[value - 1]}
				customInput={<InputRange
					maxValue={5}
					minValue={1}
					formatLabel={value => ''}
					value={value}
					onChange={onChange} />}
			/>
		</React.Fragment>
	)
}

export default PriceFilter