import React, { DetailedHTMLProps, ReactChild } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './checkbox.scss'

type CheckboxProps = {
	label?: ReactChild,
	inputProps: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}
export const Checkbox = (props: CheckboxProps) => {
	const { label, inputProps } = props
	const { defaultChecked, checked } = inputProps

	return (
		<label className="checkbox">
			{label}
			<input type="checkbox" {...inputProps} />
			<span className={'checkbox--mark'}>
				{checked === true || defaultChecked === true
					? <FontAwesomeIcon icon="check" />
					: null
				}
			</span>
		</label>
	)
}