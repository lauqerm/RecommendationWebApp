import _ from 'lodash'
import React from 'react'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { moneyFormatWholeVND } from '../../com/shorten'
import { NavLink } from 'react-router-dom'
import './tripDetail.scss'
import '../../style/trip.scss'

type TripProps = {
	id: string
}
type TripData = {
	destinations: string[],
	duration: number,
	title: string,
	price: number,
}
class TripDetail extends React.Component<TripProps> {
	tripData: TripData = {
		destinations: [],
		duration: 0,
		title: '',
		price: 0,
	}
	fetchStatus: FetchStatusProps = {
		cancelToken: undefined,
	}
	fetch = () => {
		const { id } = this.props
		const { request, tokenSource } = Fetcher.GET({
			source: `travel/${id}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			this.tripData = _.cloneDeep(response.data)
			this.forceUpdate()
		})
	}
	componentDidMount() {
		this.fetch()
	}
	render() {
		const { title, price, duration, destinations } = this.tripData
		const { id } = this.props
		return (
			<div className="tripDetail">
				<img className="tripDetail__img" src="/" />
				<div className="tripDetail__info p-2">
					<h2 className="tripDetail__header">
					<NavLink to={`/trip/${id}`}>{title}</NavLink>
					</h2>
					<div className="tripDetail__summary">
						<div className="tripDetail__review">
							Total score
							Sum of review
					</div>
						<div className="tripDetail__price">
							{moneyFormatWholeVND(price)}
						</div>
					</div>
					<div className="tripDetail__des">
						<p>
							Thời gian: {duration} ngày
						</p>
						<ul>
							{destinations.map((element, value) => {
								return <li key={`${value}`}>{element}</li>
							})}
						</ul>
					</div>
				</div>
				<div>
					Google map, maybe
				</div>
			</div>
		)
	}
}

export default TripDetail