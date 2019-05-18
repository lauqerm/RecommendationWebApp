import Input from '../../atom/form/index'
import React, { ChangeEvent } from 'react'
import { ReviewLabel } from '../../lang'
import 'react-input-range/lib/css/index.css'

type ReviewFilterProps = {
	onChange: (value: ChangeEvent<HTMLInputElement>) => void,
	value: number
}
const ReviewFilter = (props: ReviewFilterProps) => {
	const { value, onChange } = props
	return (
		<React.Fragment>
			<Input.Rate
				name="search--review"
				labelList={ReviewLabel}
				inputProps={{
					onChange
				}} />
		</React.Fragment>
	)
}

export default ReviewFilter