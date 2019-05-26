import InputRange, { Range } from 'react-input-range'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputWithLabel } from '../../atom/form'
import { PriceColorScheme, PriceLabel } from '../../lang'
import { Tag } from '../../atom'
import './Filter.scss'
import 'react-input-range/lib/css/index.css'

type PriceFilterProps = {
	onChange: (value: number | Range) => void,
	value: {
		min: number,
		max: number,
	}
}

const PriceFilter = (props: PriceFilterProps) => {
	const { value, onChange } = props
	return (
		<React.Fragment>
			<div className="priceFilter pb-1">
				<Tag color={PriceColorScheme[value.min]}>{PriceLabel[value.min]}</Tag>
				<FontAwesomeIcon icon="arrow-right" className="pl-1 pr-1" size="lg" />
				<Tag color={PriceColorScheme[value.max]}>{PriceLabel[value.max]}</Tag>
			</div>
			<InputRange
				maxValue={5}
				minValue={1}
				formatLabel={() => ''}
				value={value}
				onChange={onChange} />
		</React.Fragment>
	)
}

export default PriceFilter