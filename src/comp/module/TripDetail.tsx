import _ from 'lodash'
import Input from '../atom/form'
import React from 'react'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GoogleMap, Loader, Tag } from '../atom'
import { makeQuery } from './form/Search'
import { NavLink } from 'react-router-dom'
import {
	PriceColorScheme,
	PriceLabel,
	ReviewLabel,
	TagColorScheme,
	TagLabel
	} from '../lang'
import { withCurrentUser } from '../hoc'
import { WithCurrentUserProps } from '../hoc/withCurrentUser'
import './tripDetail.scss'

type TripProps = {
	id: string,
	showMap?: boolean,
	mode?: string,
} & WithCurrentUserProps
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
	comment_amounts: number,
	destinations: string[],
	status: number,
	schedule?: boolean,
	travel: TripInfo,
	type: string[],
}
class TripDetail extends React.Component<TripProps> {
	tripData: TripData = {
		comment_amounts: 0,
		destinations: [],
		status: 0,
		schedule: undefined,
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
	tripUpdating = false
	fetch = () => {
		const { id, currentUserId } = this.props
		const { request, tokenSource } = Fetcher.GET({
			source: `travel?id=${id}${currentUserId !== '' ? `&user_id=${currentUserId}` : ''}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			this.tripData = _.cloneDeep(response.data)
			this.tripData.travel.rating = Math.round(response.data.travel.rating)
			this.forceUpdate()
		})
	}
	addTrip = () => {
		const { id, currentUserId } = this.props
		const { request, tokenSource } = Fetcher.POST({
			data: {
				user_id: currentUserId,
				travel_id: id,
			},
			source: `schedule`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200) {
				this.tripData.schedule = true
				this.tripUpdating = false
				this.forceUpdate()
			}
		})
		this.tripUpdating = true
		this.forceUpdate()
	}
	removeTrip = () => {
		const { id, currentUserId } = this.props
		const { request, tokenSource } = Fetcher.DELETE({
			data: {
				user_id: currentUserId,
				travel_id: id,
			},
			source: `schedule`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200) {
				this.tripData.schedule = false
				this.tripUpdating = false
				this.forceUpdate()
			}
		})
		this.tripUpdating = true
		this.forceUpdate()
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
	shouldComponentUpdate() {
		return false
	}
	render() {
		const { travel, type, comment_amounts } = this.tripData
		const { address, description, location, rating, title, lower_price, upper_price } = travel
		const { id, showMap, currentUserId, mode } = this.props
		let imgResource = description.replace('https://i.imgur.com/', '/assets/img/')
		imgResource = imgResource.replace('png', 'jpg')

		return (
			<div className={`tripDetail${mode === 'SHOWROOM' ? '--showroom' : ''}`}>
				<div className="tripDetail__imgContainer">
					<div className="tripDetail__imgLoader" style={{
						backgroundImage: `url(${require('../../comp/atom/Loader/loading.gif')})`
					}}>
						{imgResource !== '' ? <img src={imgResource} className="tripDetail__img" /> : null}
					</div>
				</div>
				<div className={`tripDetail__info${mode === 'SHOWROOM' ? '--showroom' : ''} ${showMap ? 'tripDetail__combine' : ''} pt-2 pl-2 pr-2`}>
					<h2 className="tripDetail__header">
						<NavLink to={`/trip/${id}`}>{title}</NavLink>
					</h2>
					<div className="tripDetail__summary ctn--stack">
						<div className="tripDetail__review">
							<label>Đánh giá chung</label>
							<Input.DisabledRate
								rating={rating}
								labelList={ReviewLabel}
								name={`tripReview${id}`}
								labelProps={{
									title: ReviewLabel[rating]
								}} />
							<label>Số đánh giá</label>
							<div>
								{comment_amounts}
							</div>
							{lower_price !== 0 && upper_price !== 0
								? <React.Fragment>
									<label>Tầm giá</label>
									<div>
										<Tag color={PriceColorScheme[lower_price]}>{PriceLabel[lower_price]}</Tag>
										{lower_price === 0 || upper_price === 0 || lower_price === upper_price
											? null
											: <FontAwesomeIcon icon="arrow-right" className="pl-1 pr-1" size="lg" />
										}
										{lower_price === upper_price
											? null
											: <Tag color={PriceColorScheme[upper_price]}>{PriceLabel[upper_price]}</Tag>
										}
									</div>
								</React.Fragment>
								: null
							}
							<label>Địa chỉ</label>
							<div>
								{address}
							</div>
						</div>
						<div className="tripDetail__des">
							{/* <p>
								{description ? description : ''}
							</p> */}
						</div>
						<div className="tripDetail__tag pb-2">
							{type && type.length > 0
								? type.map((type) => {
									const index = TagLabel.indexOf(type)

									return (
										<Tag
											key={type}
											color={TagColorScheme[index]}
											mode="OUTLINE"
											onClick={() => {
												window.location.href = makeQuery(currentUserId, 0, { min: 0, max: 5 }, [`${index + 1}`], '0', '0')
											}}
											className="tripDetail__clickable"
										>
											{TagLabel[index]}
										</Tag>
									)
								})
								: null}
						</div>
						<div className="pb-2">
							{this.tripData.schedule !== undefined && currentUserId !== ''
								? this.tripData.schedule === false
									? <button className="btn btn-success ctn--fluid" onClick={this.addTrip} >
										{this.tripUpdating
											? <Loader size={20} />
											: 'Thêm vào lịch trình'}
									</button>
									: <button className="btn btn-danger ctn--fluid" onClick={this.removeTrip}>
										{this.tripUpdating
											? <Loader size={20} />
											: 'Loại khỏi lịch trình'}
									</button>
								: null
							}
						</div>
					</div>
				</div>
				{showMap
					? <div className="tripDetail__map">
						{location ? <GoogleMap meta={location} width="100%" /> : null}
					</div>
					: null}
			</div>
		)
	}
}

export default withCurrentUser(TripDetail)