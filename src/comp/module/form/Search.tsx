import React, { ChangeEvent } from 'react'
import { BareSearch } from './BareSearch'
import { debounce } from 'lodash'
import { Dropdown } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Range } from 'react-input-range'
import { RouteComponentProps, withRouter } from 'react-router'
import { TagLabel } from '../../lang'
import './search.scss'

type SearchState = {
	price: Range,
	review: number,
	checkedList: boolean[],
	partner: string,
	time: string,
}

type SearchProps = {
	externalQuery?: string,
	formId: string,
	display?: 'COLUMN'
} & RouteComponentProps

export const makeQuery = (review: number, price: Range, types: string[], partner?: string, time?: string) => {
	let queryURL = `/search?`
	let queries = []
	if (!isNaN(review))
		queries.push(`rating=${review}`)
	if (!isNaN(price.min) && !isNaN(price.max))
		queries.push(`lower_price=${price.min === 1 ? 0 : price.min}&upper_price=${price.max}`)
	if (types.length !== 0)
		queries.push(`type=${types.join(',')}`)
	if (partner !== '0')
		queries.push(`partner=${partner}`)
	if (time !== '0')
		queries.push(`time=${time}`)
	return `${queryURL}${queries.join('&')}`
}

class $Search extends React.Component<SearchProps, SearchState> {
	constructor(props: any) {
		super(props)
		const initialCheckedList = []
		for (let cnt = 0; cnt < TagLabel.length; cnt++)
			initialCheckedList.push(true)
		this.state = {
			price: {
				min: 1,
				max: 5
			},
			review: 0,
			partner: '0',
			time: '0',
			checkedList: initialCheckedList,
		}
	}
	onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const { price, review, checkedList, partner, time } = this.state
		let types: string[] = []
		checkedList.map((type, index) => {
			if (type !== false)
				types.push(`${index + 1}`)
		})

		this.props.history.push(makeQuery(review, price, types, partner, time))
		window.location.reload()
	}
	onPriceChange = (value: number | Range): void => {
		this.setState({
			price: (value as Range)
		})
	}
	onReviewChange = (value: string): void => {
		this.setState({
			review: Number.parseInt(value, 10)
		})
	}
	onPartnerChange = (value: string): void => {
		this.setState({
			partner: value
		})
	}
	onTimeChange = (value: string): void => {
		this.setState({
			time: value
		})
	}
	onTagChange = (name: string | null, checked: boolean): void => {
		const _checkedList = this.state.checkedList
		let pos = name
		if (pos !== null)
			_checkedList[parseInt(pos)] = checked

		this.setState({
			checkedList: _checkedList
		})
	}
	event = {
		onPriceChange: debounce(this.onPriceChange, 25),
		onReviewChange: debounce(this.onReviewChange, 25),
		onTagChange: debounce(this.onTagChange, 25),
		onPartnerChange: debounce(this.onPartnerChange, 25),
		onTimeChange: debounce(this.onTimeChange, 25)
	}
	componentDidMount() {
		try {
			if (this.props.externalQuery) {
				let query = this.props.externalQuery
				query = query.replace('search?', '')
				const paramList = query.split('&')
				const paramObject: any = {}
				paramList.forEach((param) => {
					const [name, value] = param.split('=')
					paramObject[name] = value
				})
				let newState: any = {}
				if (paramObject.rating) newState.review = Number.parseInt(paramObject.rating, 10)
				if (paramObject.lower_price && paramObject.upper_price) newState.price = {
					min: Math.max(1, Number.parseInt(paramObject.lower_price, 10)),
					max: Number.parseInt(paramObject.upper_price, 10),
				}
				if (paramObject.type) {
					const keyList = paramObject.type.split(',')
					let checkedList = []
					for (let cnt = 0; cnt < TagLabel.length; cnt++)
						checkedList.push(false)
					keyList.forEach((pos: any) => {
						checkedList[parseInt(pos, 10) - 1] = true
					})
					newState.checkedList = checkedList
				}
				if (paramObject.partner) newState.partner = paramObject.partner
				if (paramObject.time) newState.time = paramObject.time
				this.setState(newState)
			}
		}
		catch { }
	}
	componentWillUnmount() {
		this.event.onPriceChange.cancel()
		this.event.onReviewChange.cancel()
		this.event.onTagChange.cancel()
		this.event.onTimeChange.cancel()
		this.event.onPartnerChange.cancel()
	}
	render() {
		const { price, review, checkedList, partner, time } = this.state
		const { display, formId } = this.props

		return (
			<div>
				<Dropdown
					meta={{
						edge: display === 'COLUMN' ? 'BOTTOM' : 'LEFT',
						align: display === 'COLUMN' ? 'CENTER' : 'TOP',
						persist: { clickInside: true, }
					}}
					containerClassname={display === 'COLUMN' ? 'ctn--fluid' : ''}
					dropClassname={display === 'COLUMN' ? 'ctn--fluid' : ''}
					overrideStatus={display === 'COLUMN' ? true : undefined}
					child={display === 'COLUMN'
						? <div></div>
						: <div>
							<FontAwesomeIcon icon="search" size="3x" className="m-2" />
						</div>}
					drop={<BareSearch
						formId={formId}
						onPriceChange={this.event.onPriceChange}
						onReviewChange={this.event.onReviewChange}
						onPartnerChange={this.event.onPartnerChange}
						onTimeChange={this.event.onTimeChange}
						onSubmit={this.onSubmit}
						onTagChange={this.event.onTagChange}
						checkedList={checkedList}
						price={price}
						review={review}
						display={display === undefined ? '' : display}
						partner={partner}
						time={time}
					/>} />
			</div>
		)
	}
}

export const Search = withRouter($Search)