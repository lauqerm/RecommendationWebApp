import _ from 'lodash'
import React, { DetailedHTMLProps, LabelHTMLAttributes } from 'react'
import './rateInput.scss'

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
export const Rate = (props: RateProps) => {
	const _props = _.merge({
		labelList: [],
		styleClass: 'rate--star',
		disabled: false,
	}, props)
	const { name, disabled, value, valueList, labelList, styleClass, inputProps, labelProps } = _props
	let range = labelList.length
	return (
		<div className={`rate${disabled === true ? '--disabled' : ''} ${styleClass}`}>
			{labelList.map((label, position) => {
				const _position = range - 1 - position
				return <React.Fragment key={position}>
					<input
						type="radio"
						id={`${name}${_position}`}
						name={name}
						value={`${valueList !== undefined
							? valueList[_position]
							: labelList !== undefined ? labelList[_position] : _position}`}
						disabled={disabled}
						checked={value !== undefined
							&& disabled
							&& value - 1 === _position ? true : undefined}
						title={disabled ? '' : label}
						{...inputProps} />
					<label
						htmlFor={`${name}${_position}`}
						data-value={`${_position}`}
						{...labelProps}>
						{label}
					</label>
				</React.Fragment>
			})}
		</div>
	)
}