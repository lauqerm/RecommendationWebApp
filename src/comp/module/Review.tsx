import React from 'react'
import { NavLink } from 'react-router-dom'
import { ProfileImage } from '../../layout/Profile'
import { withCurrentUser } from '../hoc'
import '../../style/review.scss'

type ReviewProps = {
	userId: string,
	currentUserId: string,
	disabled?: boolean,
}
class _Review extends React.Component<ReviewProps> {
	render() {
		const { disabled, userId, currentUserId } = this.props
		const isCurrentUser = userId === currentUserId
		return (
			<div className="review">
				<ProfileImage />
				<div className="review__detail">
					<h3><NavLink to="/">Username</NavLink></h3>
					<div>Review by score</div>
					{disabled
						? <textarea></textarea>
						: 'Review by comment'
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