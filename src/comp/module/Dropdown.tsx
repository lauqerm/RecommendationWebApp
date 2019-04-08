import React, { ReactChild } from 'react'
import { mergeRight } from 'ramda'
import './Dropdown.scss'

export enum Edge { UP, DOWN, LEFT, RIGHT }
export enum Align { CENTER, UP, DOWN, LEFT, RIGHT }

export type DropdownMeta = {
	edge?: Edge,
	align?: Align,
	allowOverflow: Boolean,
	smart?: Boolean,
}

export const withDropdown = (element: ReactChild, dropElement: ReactChild, meta?: DropdownMeta) => {
	const defaultMeta: DropdownMeta = {
		edge: Edge.UP,
		align: Align.RIGHT,
		allowOverflow: false,
	}
	const _meta = mergeRight(defaultMeta, meta)
	console.log(_meta)
	return (
		<div className="dropdown_container">
			{element}
			<div className="dropdown__drop">
				{dropElement}
			</div>
		</div>
	)
}
