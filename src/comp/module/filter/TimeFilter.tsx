import React, { ChangeEvent } from 'react'
import { TimeLabel } from '../../lang'
import './Filter.scss'
import 'react-input-range/lib/css/index.css'

type TimeFilterProps = {
	onChange: (value: ChangeEvent<HTMLSelectElement>) => void,
	value: string,
}

const TimeFilter = (props: TimeFilterProps) => {
	const { value, onChange } = props
	return (
		<React.Fragment>
			<select className="form-control" id={`inlineSearchTime`}
				value={value}
				onChange={onChange}>
				{TimeLabel.map((label, index) => <option key={index} value={index}>{label}</option>)}
			</select>
		</React.Fragment>
	)
}

export default TimeFilter