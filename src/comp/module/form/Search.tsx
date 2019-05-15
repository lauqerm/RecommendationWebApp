import React from 'react'
import { debounce } from '../../../com'
import { Dropdown } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PriceFilter, ReviewFilter, TagFilter } from '../filter'
import { Range } from 'react-input-range'
import './search.scss'

export class Search extends React.Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			price: 3,
			review: 5,
		}
	}
	onPriceChange = (value: number | Range): void => {
		debounce(this.setState({
			price: value
		}), 75)
	}
	onReviewChange = (value: number | Range): void => {
		debounce(this.setState({
			review: value
		}), 75)
	}
	render() {
		return (
			<div>
				<Dropdown
					meta={{
						edge: 'LEFT',
						align: 'TOP',
						persist: { clickInside: true, }
					}}
					child={<div><FontAwesomeIcon icon="search" size="3x" className="m-2" /></div>}
					drop={<div className="search__container p-2 drop--shadow">
						<div className="ctn--stack pr-3">
							<label className="search__label">Giá cả</label>
							<PriceFilter
								onChange={this.onPriceChange}
								value={this.state.price} />
							<hr />
							<label className="search__label">Đánh giá</label>
							<ReviewFilter
								onChange={this.onReviewChange}
								value={this.state.review} />
							<div></div>
						</div>
						<div className="ctn--stack">
							<label className="search__label">Loại hình</label>
							<TagFilter />
						</div>
					</div>} />
			</div>
		)
	}
}