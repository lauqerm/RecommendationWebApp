import React, { ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { ProfileImage } from '../../layout/Profile'
import Input from '../atom/form'
import { withCurrentUser } from '../hoc'
import '../../style/review.scss'

type ReviewProps = {
	userId: string,
	currentUserId: string,
	disabled?: boolean,
	value?: number,
}
const reviewLabel = [
	'Không tốt',
	'Cần cải thiện',
	'Bình thường',
	'Rất tốt',
	'Tuyệt vời',
]
class _Review extends React.Component<ReviewProps> {
	heldValue = -1
	inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.currentTarget.value, e.currentTarget.name, e.currentTarget.title)
	}
	inputOnMouseover = (e: React.MouseEvent<HTMLLabelElement>) => {
		const value = e.currentTarget.getAttribute('data-value')
		if (value !== null) {
			this.heldValue = parseInt(value)
			this.forceUpdate()
		}
	}
	render() {
		const { value, disabled, userId, currentUserId } = this.props
		const _value = value !== undefined ? value : this.heldValue
		const isCurrentUser = userId === currentUserId
		return (
			<div className="review p-1">
				<ProfileImage />
				<div className="review__detail">
					<div>
						<h4><NavLink to={`/profile/${userId}`}>Username</NavLink></h4>
					</div>
					<div>
						<Input.Rate
							name={userId}
							labelList={reviewLabel}
							disabled={disabled}
							inputProps={{
								onChange: this.inputOnChange
							}}
							labelProps={{
								onMouseOver: this.inputOnMouseover
							}}
							value={value} />
						{_value !== undefined ? reviewLabel[_value - 1] : ''}
					</div>
					{disabled
						? 'Review by comment'
						: <textarea></textarea>
					}
					{isCurrentUser
						? <input className="btn btn-success" type="submit" value="Đăng" />
						: null
					}
				</div>
			</div>
		)
	}
}

export const Review = withCurrentUser(_Review)