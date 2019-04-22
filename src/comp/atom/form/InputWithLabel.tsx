import React, { DetailedHTMLProps, LabelHTMLAttributes, ReactChild } from 'react'
import { override } from '../../../com'

export type InputWithLabelProps = {
	disabled?: boolean | undefined,
	formId: string,
	id?: string,
	key?: string,
	label: ReactChild,
	inputProps?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
	value?: string,
	customInput?: ReactChild,
}
export const InputWithLabel = (props: InputWithLabelProps) => {
	const { key, label, id, formId, value, disabled, inputProps, labelProps, customInput } = props
	const _id = override(key, id)
	const ownId = `${formId}_${_id}`
	return (
		<React.Fragment key={`${ownId}`} >
			<label htmlFor={ownId} form={formId} {...labelProps}>
				{label}
			</label>
			{disabled
				? <div>{value}</div>
				: customInput !== undefined
					? customInput
					: <input
						name={ownId}
						id={ownId}
						form={formId}
						value={value}
						{...inputProps} />
			}
		</React.Fragment>
	)
}