import Input from '../../atom/form'
import React, { ChangeEvent } from 'react'
import { Tag } from '../../atom'
import { TagColorScheme, TagLabel } from '../../lang'
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
					label={<Tag color={TagColorScheme[index]} className="ctn--fluid" mode="OUTLINE">{element}</Tag>}
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