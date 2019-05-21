import React from 'react'
import './Tag.scss'

export type TagProps = {
	color: string,
	mode?: 'OUTLINE' | 'SOLID'
} & React.HTMLAttributes<HTMLDivElement>

export const Tag = (props: React.PropsWithChildren<TagProps>) => {
	const { children, color: baseColor, mode, className, ...rest } = props
	let color: string, bgColor
	switch (mode) {
		case 'OUTLINE':
			color = `${baseColor}`
			bgColor = 'white'
			break;
		default:
			color = 'white'
			bgColor = `${baseColor}`
			break;
	}

	return (
		<div className={`tag ${className !== undefined ? className : ''}`}
			style={{
				color,
				backgroundColor: bgColor,
				borderColor: baseColor,
			}}
			onMouseEnter={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				if(mode === 'OUTLINE') event.currentTarget.style.boxShadow = `0 0 1px 1px ${color} inset`
			}}
			onMouseLeave={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				if(mode === 'OUTLINE') event.currentTarget.style.boxShadow = `none`
			}}
			{...rest}
		>
			{children}
		</div>
	)
}