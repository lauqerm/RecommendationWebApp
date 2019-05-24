import Input from '../../atom/form/index'
import React, { ChangeEvent } from 'react'
import { ReviewLabel } from '../../lang'
import 'react-input-range/lib/css/index.css'

type ReviewFilterProps = {
	onChange: (value: ChangeEvent<HTMLInputElement>) => void,
	value: number,
	formId: string,
}
const ReviewFilter = (props: ReviewFilterProps) => {
	const { value, onChange, formId } = props
	return (
		<React.Fragment>
			<Input.Rate
				name={formId}
				labelList={ReviewLabel}
				rating={value}
				inputProps={{
					onChange
				}} />
			<br />
			{`${value < 5 && value !== 0 ? 'Trên mức ' : ''}${value !== 0 ? ReviewLabel[value] : ''}`}
		</React.Fragment>
	)
}

export default ReviewFilter