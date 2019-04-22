import React, { FormEvent } from 'react'
import { debounce } from '../../../com'
import { Dropdown } from '..'
import { PriceFilter, ReviewFilter, TagFilter } from '../filter'
import { Range } from 'react-input-range'

export class Search extends React.Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			price: 3
		}
	}
	onPriceInput = (event: FormEvent<HTMLInputElement>) => {
		debounce(this.setState({
			price: event.currentTarget.value
		}), 75)
	}
	onChange = (value: number | Range):void => {
		debounce(this.setState({
			price: value
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
					drop={<div className="ctn--stack p-1">
						<PriceFilter
							onChange={this.onChange}
							onInput={this.onPriceInput}
							value={this.state.price} />
						<ReviewFilter />
						<TagFilter />
					</div>} />
			</div>
		)
	}
}