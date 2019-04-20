import _ from 'lodash'
import React from 'react'
import TripDetail from './TripDetail'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { withCurrentUser } from '../hoc'

class Showroom extends React.Component<any> {
	suggestions = []
	fetchStatus: FetchStatusProps = {
		ready: false,
		cancelToken: undefined,
	}
	fetch = () => {
		const { currentUserId } = this.props
		let { request, tokenSource } = Fetcher.GET({
			source: `suggestion/${currentUserId}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			let { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			this.fetchStatus.ready = true
			this.suggestions = _.cloneDeep(response.data.suggestions)
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
	render() {
		return (
			<div>
				{this.suggestions.map((element) => {
					return <TripDetail key={element} id={element} />
				})}
			</div>
		)
	}
}

export default withCurrentUser(Showroom)