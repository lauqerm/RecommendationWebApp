import _ from 'lodash'
import Input from '../atom/form'
import React from 'react'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { GoogleMap } from '../atom'
import { NavLink } from 'react-router-dom'
import { ReviewLabel } from '../lang'
import './tripDetail.scss'
import '../../style/trip.scss'

type TripProps = {
	id: string,
	showMap?: boolean,
}
type TripInfo = {
	address: string,
	created_at: string,
	description: string,
	id: number,
	link: string | null,
	location: string,
	lower_price: number,
	rating: number,
	title: string,
	updated_at: string,
	upper_price: number,
}
type TripData = {
	destinations: string[],
	status: number,
	travel: TripInfo,
	type: string[],
}
class TripDetail extends React.Component<TripProps> {
	tripData: TripData = {
		destinations: [],
		status: 0,
		travel: {
			address: '',
			created_at: '',
			description: '',
			id: 0,
			link: '',
			location: '',
			lower_price: 0,
			rating: 0,
			title: '',
			updated_at: '',
			upper_price: 0,
		},
		type: [],
	}
	fetchStatus: FetchStatusProps = {
		cancelToken: undefined,
	}
	fetch = () => {
		const { id } = this.props
		const { request, tokenSource } = Fetcher.GET({
			source: `travel?id=${id}`,
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
	componentWillUnmount() {
		let cancelToken
		cancelToken = this.fetchStatus.cancelToken
		if (cancelToken)
			cancelToken.cancel()
	}
	render() {
		const { travel, type } = this.tripData
		const { address, description, location, rating, title, lower_price, upper_price } = travel
		const { id } = this.props

		return (
			<div className="tripDetail">
				<div className="tripDetail__img" style={{
					backgroundImage: `url(${description})`
				}} />
				<div className="tripDetail__info p-2">
					<h2 className="tripDetail__header">
						<NavLink to={`/trip/${id}`}>{title}</NavLink>
					</h2>
					<div className="tripDetail__summary ctn--stack">
						<div className="tripDetail__review">
							<div>
								<label>Đánh giá chung: </label>
								<Input.Rate
									disabled
									rating={rating}
									labelList={ReviewLabel}
									name={`tripReview${id}`}
									labelProps={{
										title: ReviewLabel[rating]
									}} />
							</div>
							<div>
								<label>Số đánh giá: </label>
							</div>
							<div>
								<label>Tầm giá: </label>
								<div>
									Từ {lower_price} đến {upper_price}
								</div>
							</div>
						</div>
						<div className="tripDetail__price">
							<label>Địa chỉ: </label>
							<div>
								{address}
							</div>
						</div>
						<div className="tripDetail__des">
							<p>
								{description ? description : ''}
							</p>
						</div>
					</div>
				</div>
				<div className="tripDetail__map">
					{location ? <GoogleMap meta={location} width="100%" /> : null}
				</div>
			</div>
		)
	}
}

export default TripDetail