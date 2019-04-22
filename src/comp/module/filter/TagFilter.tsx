import React from 'react'
import Input from '../../atom/form'

export const Tags = [
	'Tâm linh',
	'Thắng cảnh',
	'Ẩm thực',
	'Giải trí',
	'Nghỉ dưỡng',
	'Mạo hiểm',
]
const TagFilter = () => {
	return (
		<div>
			{Tags.map((element) => {
				return <Input.Checkbox
					label={element}
					inputProps={{
						value: element,
					}}
				/>
			})}
		</div>
	)
}

export default TagFilter