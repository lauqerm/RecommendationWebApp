import React from 'react'
import '../../style/trip.scss'

const TripDetail = (props: any) => {
	return (
		<div className="tripDetail">
			<img className="tripDetail__img" src="/" />
			<div className="tripDetail__info p-2">
				<h1 className="tripDetail__header">This is a trip</h1>
				<div className="tripDetail__summary">
					<div className="tripDetail__review">
						Review summary
					</div>
					<div className="tripDetail__price">
						PRICE
					</div>
				</div>
				<p className="tripDetail__des">
					Description here
				</p>
			</div>
			Google map, maybe
		</div>
	)
}

export default TripDetail