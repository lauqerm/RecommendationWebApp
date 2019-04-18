import React, { ChangeEvent, ReactChild } from 'react'
import { override } from '../../../com'

export type InputWithLabelProps = {
	disabled?: boolean | undefined,
	formId: string,
	id?: string,
	key: string,
	label: ReactChild,
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	type: string,
	value?: string,
}
export const InputWithLabel = (props: InputWithLabelProps) => {
	const { key, label, id, formId, value, disabled, ...spreadingProps } = props
	const _id = override(key, id)
	const ownId = `${formId}_${_id}`
	return (
		<React.Fragment key={`${ownId}`} >
			<label htmlFor={ownId} form={formId} >
				{label}
			</label>
			{disabled
				? <div>{value}</div>
				: <input name={key} id={ownId} form={formId} {...spreadingProps} />
			}
		</React.Fragment>
	)
}