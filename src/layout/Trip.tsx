import _ from 'lodash'
import React from 'react'
import { Review, TripDetail } from '../comp/module'

type TripProps = {
	id: string
}
class Trip extends React.Component<TripProps> {
	render() {
		const { id } = this.props
		return (
			<div className="trip">
				<TripDetail id={id} />
				<div className="tripReview">
					<Review userId="123" />
					<Review userId="321" value={1} disabled />
					<Review userId="443" value={3} disabled />
					<Review userId="111" value={5} disabled />
					<div></div>
				</div>
				<div className="tripSimilar">
					Similar recommend
				</div>
			</div>
		)
	}
}

export default Trip