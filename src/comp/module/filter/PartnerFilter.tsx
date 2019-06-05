import React, { ChangeEvent } from 'react'
import { PartnerLabel } from '../../lang'
import './Filter.scss'
import 'react-input-range/lib/css/index.css'

type PartnerFilterProps = {
	onChange: (value: ChangeEvent<HTMLSelectElement>) => void,
	value: string,
}

const PartnerFilter = (props: PartnerFilterProps) => {
	const { value, onChange } = props
	return (
		<React.Fragment>
			<select className="form-control" id={`inlineSearchPartner`}
				value={value}
				onChange={onChange}>
				{PartnerLabel.map((label, index) => <option key={index} value={index}>{label}</option>)}
			</select>
		</React.Fragment>
	)
}

export default PartnerFilter