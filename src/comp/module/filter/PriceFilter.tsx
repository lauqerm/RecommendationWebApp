import InputRange, { Range } from 'react-input-range'
import React from 'react'
import { InputWithLabel } from '../../atom/form'
import 'react-input-range/lib/css/index.css'

type PriceFilterProps = {
	onChange: (value: number | Range) => void,
	value: number
}
export const priceLabel = [
	'Tiết kiệm',
	'Bình dân',
	'Trung bình',
	'Rộng rãi',
	'Xa hoa'
]
const PriceFilter = (props: PriceFilterProps) => {
	const { value, onChange } = props
	return (
		<React.Fragment>
			<InputWithLabel
				formId="search"
				id="price"
				label={priceLabel[value - 1]}
				customInput={<InputRange
					maxValue={5}
					minValue={1}
					formatLabel={() => ''}
					value={value}
					onChange={onChange} />}
			/>
		</React.Fragment>
	)
}

export default PriceFilter