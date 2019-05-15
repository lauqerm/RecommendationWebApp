import React from 'react'
import './Map.scss'

export type GoogleMapProps = {
	meta: string,
	width?: string,
	height?: string,
}

export const GoogleMap = ($props: GoogleMapProps) => {
	const props = Object.assign({}, {
		width: 700,
		height: 300,
	}, $props)
	const { meta, width, height } = props

	return <div className="map__container" style={{ width: width, height: height }}>
		<iframe style={{ width: '100%', height: '100%' }}
			className="map__canvas"
			src={`https://maps.google.com/maps?q=${meta}&ie=UTF8&iwloc=&output=embed`}
			scrolling="no" />
	</div>
}