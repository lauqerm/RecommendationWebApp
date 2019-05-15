import Input from '../../atom/form'
import React from 'react'

export const Tags = [
	'Tâm linh',
	'Di tích',
	'Tham quan',
	'Thắng cảnh',
	'Ẩm thực',
	'Giải trí',
	'Nghỉ dưỡng',
	'Mạo hiểm',
	'Hồ sông suối',
	'Đô thị',
	'Nông thôn',
	'Đồi núi',
	'Biển',
	'Rừng',
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