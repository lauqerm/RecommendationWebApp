import _ from 'lodash'
import React, { DetailedHTMLProps, LabelHTMLAttributes } from 'react'
import './rate.scss'

export type RateProps = {
	name: string,
	disabled?: boolean,
	labelList: string[],
	inputProps?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
	styleClass?: string,
	rating?: number,
	valueList?: string[],
}
export const Rate = ($props: RateProps) => {
	const props = _.merge({
		labelList: [],
		styleClass: 'rate--star',
		disabled: false,
	}, $props)
	const { name, disabled, rating, valueList, labelList, styleClass, inputProps, labelProps } = props
	const range = labelList.length

	return (
		<div className={`rate${disabled === true ? '--disabled' : ''} ${styleClass}`}>
			{labelList.map((label, $position) => {
				const position = range - $position
				if (label === '')
					return null
				return <React.Fragment key={$position}>
					<input
						type="radio"
						id={`${name}${position}`}
						name={name}
						value={position}
						disabled={disabled}
						defaultChecked={rating !== undefined
							&& disabled
							&& rating === position ? true : undefined}
						data-value={(valueList && rating) && valueList[rating]}
						title={rating ? labelList[rating] : label}
						{...inputProps} />
					<label
						htmlFor={`${name}${position}`}
						data-value={position}
						{...labelProps}>
						{label}
					</label>
				</React.Fragment>
			})}
		</div>
	)
}