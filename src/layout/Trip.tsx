import React from 'react'
import { CancelTokenSource } from 'axios'
import { Fetcher } from '../com/fetcher'
import { Review, TripDetail } from '../comp/module'

type TripProps = {
	id: string
}
type FetchStatusProps = {
	cancelToken: CancelTokenSource | undefined
}
class Trip extends React.Component<TripProps> {
	fetchStatus: FetchStatusProps = {
		cancelToken: undefined,
	}
	fetch = () => {
		const id = this.props.id
		let { request, tokenSource } = Fetcher.GET({
			source: `travel/${id}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			let { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			console.log(response)
		})
	}
	componentDidMount() {
		this.fetch()
	}
	render() {
		return (
			<div className="trip">
				<TripDetail />
				<div className="tripReview">
					<Review userId="321" disabled />
					<Review userId="321" />
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