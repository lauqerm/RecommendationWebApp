import Input from '../atom/form'
import React, { FormEvent, ReactChild } from 'react'
import { Card, Split } from '../atom'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { NavLink } from 'react-router-dom'
import { ProfileImage } from '../../layout/Profile'
import { retrieveInput } from '../../com/event'
import { ReviewLabel } from '../lang'
import { withCurrentUser } from '../hoc'
import './Review.scss'

type ReviewProps = {
	id: string,
	userId: string,
	tripId: string,
	currentUserId: string,
	username?: string,
	disabled?: boolean,
	defaultRating?: number,
	content?: string,
	updatedDate?: string,
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
	}
	reviewData = {
		user_id: parseInt(this.props.userId),
		travel_id: parseInt(this.props.tripId),
		rated: false,
		rating: -1,
		tempRating: -1,
		conmented: false,
		content: '',
	}
	fetchStatus: FetchStatusProps = {
		ready: false,
		cancelToken: undefined,
	}
	onSubmit = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { conmented, rated, content } = this.reviewData

		if (!conmented)
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

		const { request, tokenSource } = Fetcher.POST({
			source: `comment`,
			data: this.reviewData
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
		this.reviewData.rated = true
		this.reviewData.rating = parseInt(retrieveInput(e).rawValue)
	}
	textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.reviewData.conmented = true
		this.reviewData.content = retrieveInput(e).rawValue
	}
	inputOnMouseover = (e: React.MouseEvent<HTMLLabelElement>) => {
		const value = e.currentTarget.getAttribute('data-value')
		if (value !== null) {
			this.reviewData.tempRating = parseInt(value)
			this.forceUpdate()
		}
	}
	render() {
		const { id, defaultRating, disabled, userId, content, updatedDate, username } = this.props
		const { tempRating } = this.reviewData
		const { error, errorCode, success, successCode } = this.state
		const _updatedDate = updatedDate === undefined ? undefined : new Date(updatedDate)
		const _value = defaultRating !== undefined ? defaultRating : tempRating

		return (
			<div className="review p-1">
				<div className="reviewHeader">
					<h3>
						<NavLink className="review__Username" to={`/profile/${userId}`}>{username}</NavLink>
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
					<Input.Rate
						name={`rate${id}`}
						labelList={ReviewLabel}
						disabled={disabled}
						inputProps={{
							onChange: this.inputOnChange
						}}
						labelProps={{
							onMouseOver: !(disabled) ? this.inputOnMouseover : undefined,
							title: disabled ? ReviewLabel[_value] : ''
						}}
						rating={_value} />
					{_value !== undefined ? ReviewLabel[_value] : ''}
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