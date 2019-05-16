import React from 'react'
import './Tag.scss'

export type TagProps = {
	color: string,
	mode?: 'OUTLINE' | 'SOLID'
}

export const Tag = (props: React.PropsWithChildren<TagProps>) => {
	const { children, color: baseColor, mode } = props
	let color, bgColor
	switch (mode) {
		case 'OUTLINE':
			color = baseColor
			bgColor = 'white'
			break;
		default:
			color = 'white'
			bgColor = baseColor
			break;
	}

	return (
		<div className="tag" style={{
			color,
			backgroundColor: bgColor,
			borderColor: baseColor,
		}}
		>
			{children}
		</div>
	)
}