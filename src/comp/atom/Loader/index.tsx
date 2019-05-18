import mergeDeepRight from 'ramda/es/mergeDeepRight'
import React from 'react'
import './loader.scss'

export type LoaderProps = {
	size?: number,
}
export const Loader = ($props: LoaderProps) => {
	const defaultProps = {
		size: 50
	}
	const props = mergeDeepRight(defaultProps, $props)

	return (
		<div style={{ width: `${props.size}px`, height: `${props.size}px` }} className="loader" />
	)
}