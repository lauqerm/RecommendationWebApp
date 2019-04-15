import React, { ReactChild } from 'react'
import { override } from '../../../com'

export type InputWithLabelProps = {
	key: string,
	label: ReactChild,
	id?: string,
	formId: string,
	type: string,
	required?: boolean,
}
export const InputWithLabel = (props: InputWithLabelProps) => {
	const { key, label, id, formId, ...spreadingProps } = props
	const _id = override(key, id)
	const ownId = `${formId}_${_id}`
	return (
		<React.Fragment key={`${ownId}`} >
			<label htmlFor={ownId} form={formId} >
				{label}
			</label>
			<input id={ownId} form={formId} {...spreadingProps} />
		</React.Fragment>
	)
}