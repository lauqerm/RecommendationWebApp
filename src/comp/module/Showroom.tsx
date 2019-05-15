import _ from 'lodash'
import React from 'react'
import TripDetail from './TripDetail'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { Loader } from '../atom'
import { withCurrentUser } from '../hoc'
import './showroom.scss'

class $Showroom extends React.Component<any> {
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
	componentWillUnmount() {
		let cancelToken
		cancelToken = this.fetchStatus.cancelToken
		if (cancelToken)
			cancelToken.cancel()
	}
	render() {
		return (
			this.fetchStatus.ready
				? <div className="showroom">
					{this.suggestions.map((element) => {
						return <TripDetail key={element} id={element} />
					})}
				</div>
				: <Loader />
		)
	}
}

export default withCurrentUser($Showroom)