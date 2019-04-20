import _ from 'lodash'
import React, { ChangeEvent } from 'react'
import './rateInput.scss'

export type RateInputProps = {
	name: string,
	range: number,
	disabled?: boolean,
	labelList?: string[],
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	onMouseOver?: (e: React.MouseEvent<HTMLLabelElement>) => void,
	styleClass?: string,
	value?: number,
	valueList?: string[],
}
export const RateInput = (props: RateInputProps) => {
	const _props = _.merge({
		range: 5,
		styleClass: 'rate--star',
		disabled: false,
	}, props)
	const { name, disabled, range, value, valueList, labelList, onChange, styleClass, onMouseOver } = _props
	let _range = range
	let _rateList = []
	for (let cnt = _range - 1; cnt >= 0; cnt--) {
		_rateList.push({
			onChange,
			label: labelList !== undefined ? labelList[cnt] : '',
			value: valueList !== undefined
				? valueList[cnt]
				: labelList !== undefined ? labelList[cnt] : cnt,
			position: cnt,
			checked: value === cnt + 1 ? true : undefined
		})
	}
	return (
		<div className={`rate${disabled === true ? '--disabled' : ''} ${styleClass}`}>
			{_rateList.map((element) => {
				const { position, label, onChange, value, checked } = element
				return <React.Fragment key={position}>
					<input
						type="radio"
						id={`${name}${position}`}
						name={name}
						value={`${value}`}
						onChange={onChange}
						disabled={disabled}
						checked={checked}
						title={disabled ? '' : label} />
					<label
						onMouseOver={onMouseOver}
						htmlFor={`${name}${position}`}
						data-value={`${position}`}>
						{label}
					</label>
				</React.Fragment>
			})}
		</div>
	)
}