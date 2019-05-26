import _ from 'lodash'
import React from 'react'
import TripDetail from './TripDetail'
import { Fetcher, FetchStatusProps } from '../../com/fetcher'
import { Loader } from '../atom'
import { Search } from './form'
import { withCurrentUser } from '../hoc'
import './showroom.scss'

class $Showroom extends React.Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			error: false,
			errorCode: '',
			success: false,
			successCode: '',
		}
	}
	currentShowroomId = '-'
	suggestions = []
	fetchStatus: FetchStatusProps = {
		ready: false,
		cancelToken: undefined,
	}
	fetch = () => {
		const { currentUserId, externalQuery } = this.props

		let { request, tokenSource } = Fetcher.GET({
			source: externalQuery ? externalQuery : `suggestion${currentUserId !== '' ? `?user_id=${currentUserId}` : ''}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			let { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			this.suggestions = _.cloneDeep(response.data.suggestions)
			this.fetchStatus.ready = true
			this.setState({
				success: true
			})
		}).catch(() => {
			this.fetchStatus.ready = true
			this.setState({
				error: true
			})
		})
	}
	componentDidMount() {
		if (this.currentShowroomId !== this.props.currentUserId && !this.fetchStatus.ready) {
			this.currentShowroomId = this.props.currentUserId
			this.fetch()
		}
	}
	componentDidUpdate() {
		if (this.currentShowroomId !== this.props.currentUserId && !this.fetchStatus.ready) {
			this.currentShowroomId = this.props.currentUserId
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
			<div className="siteView--2col">
				{this.fetchStatus.ready
					? this.state.success && this.suggestions
						? <React.Fragment>
							<Search display="COLUMN" externalQuery={this.props.externalQuery} formId="inline-search" />
							<div className="showroom">
								{this.suggestions.map((element) => {
									return <TripDetail key={element} id={element} />
								})}
							</div>
						</React.Fragment>
						: <div className="ctn--gridRowFluid p-3 mt-1 showroom__message">Đã xảy ra lỗi</div>
					: <div className="ctn--gridRowFluid p-3 mt-1 showroom__message">
						<Loader />
					</div>
				}
			</div>
		)
	}
}

export default withCurrentUser($Showroom)