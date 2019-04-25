import React from 'react'
import { debounce } from '../../../com'
import { Dropdown } from '..'
import { PriceFilter, ReviewFilter, TagFilter } from '../filter'
import { Range } from 'react-input-range'

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
						persist: { clickInside: true, }
					}}
					child={<div>Magnifier</div>}
					drop={<div className="ctn--stack p-2 drop--shadow">
						<PriceFilter
							onChange={this.onPriceChange}
							value={this.state.price} />
						<hr />
						<ReviewFilter
							onChange={this.onReviewChange}
							value={this.state.review} />
						<hr />
						<TagFilter />
					</div>} />
			</div>
		)
	}
}