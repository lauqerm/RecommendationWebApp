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
}

type SearchProps = {
	externalQuery?: string,
	formId: string,
	display?: 'COLUMN'
} & RouteComponentProps

export const makeQuery = (review: number, price: Range, types: string[]) => {
	let queryURL = `/search?`
	let queries = []
	if (!isNaN(review))
		queries.push(`rating=${review}`)
	if (!isNaN(price.min) && !isNaN(price.max))
		queries.push(`lower_price=${price.min === 1 ? 0 : price.min}&upper_price=${price.max}`)
	if (types.length !== 0)
		queries.push(`type=${types.join(',')}`)
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
			checkedList: initialCheckedList,
		}
	}
	onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const { price, review, checkedList } = this.state
		let types: string[] = []
		checkedList.map((type, index) => {
			if (type !== false)
				types.push(`${index + 1}`)
		})

		this.props.history.push(makeQuery(review, price, types))
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
				this.setState(newState)
			}
		}
		catch {}
	}
	componentWillUnmount() {
		this.event.onPriceChange.cancel()
		this.event.onReviewChange.cancel()
		this.event.onTagChange.cancel()
	}
	render() {
		const { price, review, checkedList } = this.state
		const { display, formId } = this.props
		const SearchModule = <BareSearch
			formId={formId}
			onPriceChange={this.event.onPriceChange}
			onReviewChange={this.event.onReviewChange}
			onSubmit={this.onSubmit}
			onTagChange={this.event.onTagChange}
			checkedList={checkedList}
			price={price}
			review={review}
			display={display === undefined ? '' : display}
		/>

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
					drop={SearchModule} />
			</div>
		)
	}
}

export const Search = withRouter($Search)