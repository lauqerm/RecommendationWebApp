import _ from 'lodash'
import React from 'react'
import { Fetcher, FetchStatusProps } from '../com/fetcher'
import { Loader } from '../comp/atom'
import { Review, TripDetail } from '../comp/module'
import { withCurrentUser } from '../comp/hoc'
import { WithCurrentUserProps } from '../comp/hoc/withCurrentUser'
import './Trip.scss'

type TripProps = {
	id: string
} & WithCurrentUserProps
class $Trip extends React.Component<TripProps> {
	reviews = []
	fetchStatus: FetchStatusProps = {
		ready: false,
		cancelToken: undefined,
	}
	fetch = () => {
		const { id } = this.props
		let { request, tokenSource } = Fetcher.GET({
			source: `travel_comments/${id}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			let { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			this.fetchStatus.ready = true

			this.reviews = _.cloneDeep(response.data.comments)
			this.forceUpdate()
		})
	}
	componentDidMount() {
		if (this.props.currentUserId !== '' && !this.fetchStatus.ready) {
			this.fetch()
		}
	}
	componentDidUpdate() {
		if (this.props.currentUserId !== '' && !this.fetchStatus.ready) {
			this.fetch()
		}
	}
	componentWillUnmount() {
		let cancelToken
		cancelToken = this.fetchStatus.cancelToken
		if (cancelToken)
			cancelToken.cancel()
	}
	render() {
		const { id, currentUserId } = this.props
		const { ready } = this.fetchStatus
		const isAlreadyCommented = this.reviews.filter((review: any) => {
			return currentUserId && `${review.user_id}` === currentUserId
		})

		return (
			<div className="trip">
				<div style={{ gridArea: 'detail' }}>
					<TripDetail id={id} showMap />
				</div>
				<div className="tripReview">
					{(currentUserId && isAlreadyCommented.length === 0) || this.reviews.length === 0
						? <Review id="0" tripId={id} userId={currentUserId} />
						: null
					}
					{ready
						? this.reviews.map((review) => {
							const { id, user_id, content, updated_at, rating, username } = review

							return <Review
								key={id}
								id={id}
								userId={user_id}
								name={username}
								tripId={id}
								comment={content}
								updatedDate={updated_at}
								defaultRating={rating}
								disabled
								{...review} />
						})
						: <Loader />
					}
				</div>
				<div className="tripSimilar">
					{/* Similar recommend */}
				</div>
			</div>
		)
	}
}

export default withCurrentUser($Trip)