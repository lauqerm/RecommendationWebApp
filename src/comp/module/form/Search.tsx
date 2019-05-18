import history from '../../../route/history'
import React, { ChangeEvent } from 'react'
import { debounce } from '../../../com'
import { Dropdown } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PriceFilter, ReviewFilter, TagFilter } from '../filter'
import { Range } from 'react-input-range'
import { retrieveInput } from '../../../com/event'
import { ReviewLabel, TagLabel } from '../../lang'
import './search.scss'

type SearchState = {
	price: Range,
	review: number,
	checkedList: boolean[],
}

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

export class Search extends React.Component<any, SearchState> {
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

		window.location.href = makeQuery(review, price, types)
	}
	onPriceChange = (value: number | Range): void => {
		debounce(this.setState({
			price: (value as Range)
		}), 25)
	}
	onReviewChange = (value: ChangeEvent<HTMLInputElement>): void => {
		debounce(this.setState({
			review: Number.parseInt(value.currentTarget.value, 10)
		}), 25)
	}
	onTagChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const _checkedList = this.state.checkedList
		let pos = event.currentTarget.getAttribute('name')
		if (pos !== null)
			_checkedList[parseInt(pos)] = retrieveInput(event).checked

		debounce(this.setState({
			checkedList: _checkedList
		}), 25)
	}
	render() {
		const { price, review, checkedList } = this.state

		return (
			<div>
				<Dropdown
					meta={{
						edge: 'LEFT',
						align: 'TOP',
						persist: { clickInside: true, }
					}}
					child={<div><FontAwesomeIcon icon="search" size="3x" className="m-2" /></div>}
					drop={<form
						className="drop--shadow search__container p-2"
						onSubmit={this.onSubmit}>
						<div className="ctn--stack">
							<label className="search__label">Loại hình</label>
							<TagFilter checkedList={checkedList} onChange={this.onTagChange} />
						</div>
						<div className="search__range ctn--stack pr-2 pl-3">
							<div>
								<label className="search__label">Giá cả</label>
								<PriceFilter
									onChange={this.onPriceChange}
									value={price} />
								<hr />
							</div>
							<div>
								<label className="search__label">Đánh giá</label>
								<div>
									<ReviewFilter
										onChange={this.onReviewChange}
										value={review} />
									<br />
									{`${review < 5 && review !== 0 ? 'Trên mức ' : ''}${review !== 0 ? ReviewLabel[review] : ''}`}
								</div>
							</div>
							<div></div>
							<div>
								<input type="submit" className="btn btn-success" value="Tìm kiếm" />
							</div>
						</div>
					</form>} />
			</div>
		)
	}
}