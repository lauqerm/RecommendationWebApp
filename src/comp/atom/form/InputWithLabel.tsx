import React, { ReactChild } from 'react'
import { override } from '../../../com'

export type InputWithLabelProps = {
	key: string,
	label: ReactChild,
	id?: string,
	formId: string,
	type: string,
	disabled?: boolean | undefined,
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
				: <input id={ownId} form={formId} {...spreadingProps} />
			}
		</React.Fragment>
	)
}