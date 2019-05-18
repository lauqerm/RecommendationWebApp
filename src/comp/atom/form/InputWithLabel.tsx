import React, {
	DetailedHTMLProps,
	HTMLAttributes,
	LabelHTMLAttributes,
	ReactChild
	} from 'react'
import { override } from '../../../com'

export type InputWithLabelProps = {
	formId: string,
	label: ReactChild,
	name?: string,
	customInput?: ReactChild,
	disabled?: boolean | undefined,
	id?: string,
	value?: string,
	inputProps?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
	disabledLabelProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
}
export const InputWithLabel = (props: InputWithLabelProps) => {
	const { label, id, name, formId, value, disabled, inputProps, labelProps, customInput, disabledLabelProps } = props
	const ownId = `${formId}_${id}`
	const _name = override('', name)

	return (
		<React.Fragment key={`${ownId}`} >
			<label htmlFor={ownId} form={formId} {...labelProps}>
				{label}
			</label>
			{disabled
				? <div {...disabledLabelProps}>{value}</div>
				: customInput !== undefined
					? customInput
					: <input
						name={_name}
						id={ownId}
						form={formId}
						defaultValue={value}
						{...inputProps} />
			}
		</React.Fragment>
	)
}