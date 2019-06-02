import _ from 'lodash'
import React from 'react'
import { Card, Loader, Tag } from '../comp/atom'
import { Fetcher, FetchStatusProps } from '../com/fetcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { PriceColorScheme, PriceLabel } from '../comp/lang'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { withCurrentUser } from '../comp/hoc'
import { WithCurrentUserProps } from '../comp/hoc/withCurrentUser'
import './Schedule.scss'
import '../comp/module/tripDetail.scss'

const arrayMove = require('array-move')

type ScheduleProps = {
	id: string
} & WithCurrentUserProps & RouteComponentProps

const SortableItem = SortableElement((props: any) => {
	const { travel, travel_id, id, onUpdateSchedule } = props
	const { address, title, lower_price, upper_price } = travel

	return (
		<div className="tripDetail tripDetail--tiny">
			<div className="pt-2 pl-2 pr-2">
				<h2 className="tripDetail__header">
					<NavLink to={`/trip/${travel_id}`}>{title}</NavLink>
				</h2>
				<div className="tripDetail__summary--tiny">
					<div className="tripDetail__review">
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
					<div className="pb-2">
						<button className="btn btn-danger ctn--fluid" onClick={() => onUpdateSchedule(id)}>
							Loại khỏi lịch trình
						</button>
					</div>
				</div>
			</div>
		</div>
	)
})
const SortableList = SortableContainer((props: any) => {
	const { onUpdateSchedule } = props
	return (
		<ul>
			{props.items.map((element: any, index: number) => {
				return !element.travel ? <Loader key={index} /> : <SortableItem key={index} index={index} onUpdateSchedule={onUpdateSchedule} {...element} />
			})}
		</ul>
	);
})

class $Schedule extends React.Component<ScheduleProps, any> {
	constructor(props: ScheduleProps) {
		super(props)
		this.state = {
			success: false,
		}
	}
	schedules: any[] = []
	fetchStatus: FetchStatusProps = {
		ready: false,
		cancelToken: undefined,
	}
	fetch = () => {
		const { id, currentUserId } = this.props
		let { request, tokenSource } = Fetcher.GET({
			source: `schedule?user_id=${id}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			let { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined
			this.fetchStatus.ready = true

			this.schedules = response.data.schedules.map((schedule: any, index: number) => {
				const { travel_id } = schedule
				const { request, tokenSource } = Fetcher.GET({
					source: `travel?id=${travel_id}${currentUserId !== '' ? `&user_id=${currentUserId}` : ''}`,
				})
				request.then((response) => {
					const { cancelToken } = this.fetchStatus
					if (cancelToken)
						this.fetchStatus.cancelToken = undefined

					if (response.status === 200) {
						this.schedules[index] = { ...this.schedules[index], ...response.data, ready: true }
						if (this.schedules.filter(item => item.ready === true).length === this.schedules.length) {
							this.fetchStatus.ready = true
							this.forceUpdate()
						}
					}
				})
				return {
					...schedule,
					cancelToken: tokenSource
				}
			})
			this.forceUpdate()
		})
	}
	onChangeSchedule = () => {
		const { currentUserId } = this.props
		const { request, tokenSource } = Fetcher.PATCH({
			data: {
				user_id: currentUserId,
				schedules: this.schedules.map((schedule) => {
					return schedule.id
				}).join(',')
			},
			source: `schedule`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200) {
				this.setState({
					success: true
				})
			}
		})
	}
	onDeleteSchedule = () => {
		const { currentUserId } = this.props
		this.schedules.map((schedule: any, index: number) => {
			const { id } = schedule
			const { request, tokenSource } = Fetcher.DELETE({
				data: {
					user_id: currentUserId,
					id: id,
				},
				source: `schedule`,
			})
			request.then((response) => {
				const { cancelToken } = this.fetchStatus
				if (cancelToken)
					this.fetchStatus.cancelToken = undefined

				if (response.status === 200) {
					this.schedules[index] = { ...this.schedules[index], removed: true }
					if (this.schedules.filter(item => item.removed !== true).length === 0) {
						this.schedules = []
						this.forceUpdate()
					}
				}
			})
			return {
				...schedule,
				cancelToken: tokenSource
			}
		})
	}
	onUpdateSchedule = (id: string) => {
		const { currentUserId } = this.props
		const { request, tokenSource } = Fetcher.DELETE({
			data: {
				user_id: currentUserId,
				id: id,
			},
			source: `schedule`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200) {
				this.schedules = this.schedules.filter((schedule: any) => {
					return schedule.id !== id
				})
				this.forceUpdate()
			}
		})
	}
	onSortEnd = (indices: any) => {
		const { oldIndex, newIndex } = indices
		this.schedules = arrayMove(this.schedules, oldIndex, newIndex)
		this.forceUpdate()
	}
	componentDidMount() {
		if (!this.fetchStatus.ready) {
			this.fetch()
		}
	}
	componentWillUnmount() {
		let cancelToken
		cancelToken = this.fetchStatus.cancelToken
		if (cancelToken)
			cancelToken.cancel()
		this.schedules.forEach(schedule => {
			if (schedule.cancelToken !== undefined)
				schedule.cancelToken.cancel()
		})
	}
	render() {
		const { success } = this.state

		return (
			<div className="schedule p-3">
				{this.fetchStatus.ready
					? this.schedules.length !== 0
						? <React.Fragment>
							<button onClick={this.onDeleteSchedule} className="btn btn-info mb-3">Xóa lịch trình</button>
							<SortableList items={this.schedules} onSortEnd={this.onSortEnd} onUpdateSchedule={this.onUpdateSchedule} />
							<div className="pt-1" style={{ textAlign: 'left' }}>
								{success ? <Card.Success>Đã cập nhật</Card.Success> : ''}
							</div>
							<div className="profile__cont--act">
								<input onClick={this.onChangeSchedule} className="btn btn-success" type="submit" value="Lưu thay đổi" />
								<button onClick={() => this.props.history.push('/')} className="btn btn-danger">Hủy bỏ</button>
							</div>
						</React.Fragment>
						: <div className="p-3 mt-1 schedule__message">
							Bạn không có lịch trình nào
						</div>
					: <Loader />
				}
			</div>
		)
	}
}

export default withRouter(withCurrentUser($Schedule))
