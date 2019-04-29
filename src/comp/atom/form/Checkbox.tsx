import React, { DetailedHTMLProps } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './checkbox.scss'

type CheckboxProps = {
	label?: string,
	inputProps?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}
export const Checkbox = (props: CheckboxProps) => {
	const { label, inputProps } = props

	return (
		<label className="checkbox">
			{label}
			<input type="checkbox" {...inputProps} />
			<span className={'checkbox--mark'}>
				{inputProps && inputProps.defaultChecked === true
					? <FontAwesomeIcon icon="check" />
					: null
				}
			</span>
		</label>
	)
}