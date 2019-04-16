import React, { FormEvent } from 'react'
import { debounce } from '../../../com'
import { Dropdown } from '..'
import { PriceFilter, ReviewFilter, TagFilter } from '../filter'
import '../../../style/layout.scss'

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
	render() {
		return (
			<div>
				<Dropdown
					child={<div>Magnifier</div>}
					drop={<div className="container--stack">
						<PriceFilter onInput={this.onPriceInput} value={this.state.price} />
						<ReviewFilter />
						<TagFilter />
					</div>} />
			</div>
		)
	}
}