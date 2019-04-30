import _ from 'lodash'
import React, { DetailedHTMLProps, LabelHTMLAttributes } from 'react'
import './rate.scss'

export type RateProps = {
	name: string,
	disabled?: boolean,
	labelList: string[],
	inputProps: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	labelProps: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
	styleClass?: string,
	value?: number,
	valueList?: string[],
}
export const Rate = ($props: RateProps) => {
	const props = _.merge({
		labelList: [],
		styleClass: 'rate--star',
		disabled: false,
	}, $props)
	const { name, disabled, value, valueList, labelList, styleClass, inputProps, labelProps } = props
	let range = labelList.length
	return (
		<div className={`rate${disabled === true ? '--disabled' : ''} ${styleClass}`}>
			{labelList.map((label, $position) => {
				const position = range - 1 - $position
				return <React.Fragment key={$position}>
					<input
						type="radio"
						id={`${name}${position}`}
						name={name}
						value={`${valueList !== undefined
							? valueList[position]
							: labelList !== undefined ? labelList[position] : position}`}
						disabled={disabled}
						checked={value !== undefined
							&& disabled
							&& value - 1 === position ? true : undefined}
						title={disabled ? '' : label}
						{...inputProps} />
					<label
						htmlFor={`${name}${position}`}
						data-value={`${position}`}
						{...labelProps}>
						{label}
					</label>
				</React.Fragment>
			})}
		</div>
	)
}