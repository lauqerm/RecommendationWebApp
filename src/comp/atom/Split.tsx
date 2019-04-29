import React, { CSSProperties } from 'react'
import './split.scss'

type SplitType = {
	dir: 'hor' | 'ver',
	style?: CSSProperties,
}
export const Split = (props: SplitType) => {
	const { style, dir } = props
	return <div style={style} className={`split--${dir}`} />
}