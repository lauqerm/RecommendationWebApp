import Input from '../atom/form'
import React, { FormEvent, ReactChild } from 'react'
import { Card, Split } from '../atom'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { NavLink } from 'react-router-dom'
import { PartnerLabel, ReviewLabel, TimeLabel } from '../lang'
import { ProfileImage } from '../../layout/Profile'
import { retrieveInput } from '../../com/event'
import { withCurrentUser } from '../hoc'
import './Review.scss'

type ReviewProps = {
	id: string,
	userId: string,
	tripId: string,
	currentUserId: string,
	name?: string,
	disabled?: boolean,
	defaultRating?: number,
	content?: string,
	updatedDate?: string,
	partner?: number,
	time?: number,
}
type ReviewState = {
	error: boolean,
	errorCode: string,
	success: boolean,
	successCode: string,
}
class $Review extends React.Component<ReviewProps, ReviewState> {
	constructor(props: ReviewProps) {
		super(props)
		this.state = {
			error: false,
			errorCode: '',
			success: false,
			successCode: '',
		}
	}
	lang: { [key: string]: ReactChild } = {
		placeholder: 'Tối thiểu 15 ký tự, vui lòng nhập tiếng Việt có dấu',
		missingComment: 'Vui lòng điền nhận xét trước khi đăng',
		tooShortComment: 'Vui lòng điền nhận xét dài hơn 15 ký tự',
		missingRate: 'Vui lòng đánh giá thang điểm trước khi đăng',
		missingPartner: 'Vui lòng chọn bạn đồng hành',
		missingTime: 'Vui lòng chọn thời gian bạn đã đi',
	}
	reviewData = {
		user_id: parseInt(this.props.userId),
		travel_id: parseInt(this.props.tripId),
		rated: false,
		rating: -1,
		tempRating: -1,
		commented: false,
		content: '',
		partner: 0,
		partnerChosed: false,
		time: 0,
		timeChosed: false,
	}
	fetchStatus: FetchStatusProps = {
		ready: false,
		cancelToken: undefined,
	}
	onSubmit = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { commented, rated, content, partnerChosed, timeChosed } = this.reviewData
		const { currentUserId } = this.props

		if (!commented)
			return this.setState({
				error: true,
				errorCode: 'missingComment',
			})
		else if (content.length <= 15)
			return this.setState({
				error: true,
				errorCode: 'tooShortComment',
			})

		if (!rated)
			return this.setState({
				error: true,
				errorCode: 'missingRate',
			})

		if (!partnerChosed)
			return this.setState({
				error: true,
				errorCode: 'missingPartner',
			})

		if (!timeChosed)
			return this.setState({
				error: true,
				errorCode: 'missingTime',
			})

		const { request, tokenSource } = Fetcher.POST({
			source: `comment`,
			data: {
				...this.reviewData,
				user_id: currentUserId
			}
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200)
				location.reload()
		})

		this.setState({
			error: false,
			errorCode: '',
		})
	}
	inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.reviewData.rating = parseInt(retrieveInput(e).rawValue)
		if (this.reviewData.rating <= 5 && this.reviewData.rating >= 1)
			this.reviewData.rated = true
		else
			this.reviewData.rated = false
	}
	textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.reviewData.content = retrieveInput(e).rawValue
		if (this.reviewData.content.length != 0)
			this.reviewData.commented = true
		else
			this.reviewData.commented = false
	}
	inputOnPartnerChange = (value: string) => {
		this.reviewData.partner = parseInt(value)
		if (this.reviewData.partner <= PartnerLabel.length && this.reviewData.partner >= 1)
			this.reviewData.partnerChosed = true
		else
			this.reviewData.partnerChosed = false
	}
	inputOnTimeChange = (value: string) => {
		this.reviewData.time = parseInt(value)
		if (this.reviewData.time <= 4 && this.reviewData.time >= 1)
			this.reviewData.timeChosed = true
		else
			this.reviewData.timeChosed = false
	}
	inputOnMouseover = (e: React.MouseEvent<HTMLLabelElement>) => {
		const value = e.currentTarget.getAttribute('data-value')
		if (value !== null) {
			this.reviewData.tempRating = parseInt(value)
			this.forceUpdate()
		}
	}
	inputOnMouseout = () => {
		this.reviewData.tempRating = this.reviewData.rating
		this.forceUpdate()
	}
	render() {
		const { id, defaultRating, disabled, userId, content, updatedDate, name, time, partner } = this.props
		const { tempRating } = this.reviewData
		const { error, errorCode, success, successCode } = this.state
		const _updatedDate = updatedDate === undefined ? undefined : new Date(updatedDate)
		const _value = defaultRating !== undefined ? defaultRating : tempRating

		return (
			<div className="review p-1">
				<div className="reviewHeader">
					<h3>
						{disabled
							? <NavLink className="review__Username" to={`/profile/${userId}`}>{name}</NavLink>
							: 'Nhận xét của bạn'}
					</h3>
					<div className="review__Date">
						{_updatedDate !== undefined
							? `${_updatedDate.toLocaleString('vn-VN', {
								hour12: false
							})}`
							: null
						}
					</div>
				</div>
				<div>
					{disabled
						? <Input.DisabledRate
							name={`rate${id}`}
							labelList={ReviewLabel}
							rating={_value} />
						: <Input.Rate
							name={`rate${id}`}
							labelList={ReviewLabel}
							disabled={disabled}
							inputProps={{
								onChange: this.inputOnChange
							}}
							labelProps={{
								onMouseOut: !(disabled) ? this.inputOnMouseout : undefined,
								onMouseOver: !(disabled) ? this.inputOnMouseover : undefined,
								title: disabled ? ReviewLabel[_value] : ''
							}}
							rating={_value} />
					}
					{_value !== undefined ? ReviewLabel[_value] : ''}
				</div>
				<div className="reviewOption">
					{disabled
						? <div>{partner !== undefined && partner !== null ? `Đi cùng ${PartnerLabel[partner]}` : null}</div>
						: <select className="form-control" id={`partner${id}`}
							onChange={(e) => this.inputOnPartnerChange(e.currentTarget.value)} required>
							{PartnerLabel.map((label, index) => <option key={index} value={index}>{label}</option>)}
						</select>
					}
					{disabled
						? <div>{time !== undefined && time !== null ? `Đi vào thời điểm ${TimeLabel[time]}` : null}</div>
						: <select className="form-control" id={`time${id}`}
							onChange={(e) => this.inputOnTimeChange(e.currentTarget.value)} required>
							{TimeLabel.map((label, index) => <option key={index} value={index}>{label}</option>)}
						</select>
					}
				</div>
				<Split dir="hor" />
				{disabled
					? content
					: <textarea
						placeholder={this.lang.placeholder.toString()}
						name={`cmt${id}`}
						onChange={this.textareaOnChange} />
				}
				<div className="pt-1">
					{error && <Card.Error>{this.lang[errorCode]}</Card.Error>}
					{success && <Card.Success>{this.lang[successCode]}</Card.Success>}
				</div>
				{!disabled
					&& <input
						className="btn btn-success"
						onClick={this.onSubmit}
						type="submit"
						value="Đăng" />
				}
			</div>
		)
	}
}

export const Review = withCurrentUser($Review)