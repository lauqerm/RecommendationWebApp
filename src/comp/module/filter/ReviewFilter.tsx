import InputRange, { Range } from 'react-input-range'
import React from 'react'
import { InputWithLabel } from '../../atom/form'
import { ReviewLabel } from '../../lang'
import 'react-input-range/lib/css/index.css'

type ReviewFilterProps = {
	onChange: (value: number | Range) => void,
	value: number
}
const ReviewFilter = (props: ReviewFilterProps) => {
	const { value, onChange } = props
	return (
		<React.Fragment>
			<InputWithLabel
				formId="search"
				id="review"
				label={ReviewLabel[value]}
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

export default ReviewFilter