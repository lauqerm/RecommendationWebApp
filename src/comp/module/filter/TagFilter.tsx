import Input from '../../atom/form'
import React, { ChangeEvent } from 'react'
import { TagLabel } from '../../lang'
import './Filter.scss'

type TagFilterProps = {
	onChange: (value: ChangeEvent<HTMLInputElement>) => void,
	checkedList: boolean[]
}
const TagFilter = (props: TagFilterProps) => {
	const { checkedList, onChange } = props

	return (
		<div className="tagFilter--column">
			{TagLabel.map((element, index) => {
				return <Input.Checkbox
					key={element}
					label={element}
					inputProps={{
						name: `${index}`,
						value: element,
						onChange,
						defaultChecked: checkedList[index] === false ? false : true
					}}
				/>
			})}
		</div>
	)
}

export default TagFilter