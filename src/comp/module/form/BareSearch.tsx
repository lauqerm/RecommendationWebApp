import React from 'react'
import { PriceFilter, ReviewFilter, TagFilter } from '../filter'
import { Range } from 'react-input-range'
import { ReviewLabel } from '../../lang'

export type BareSearchProps = {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
	checkedList: boolean[],
	onTagChange: (name: string | null, checked: boolean) => void,
	onReviewChange: (value: string) => void,
	onPriceChange: (value: number | Range) => void,
	price: Range,
	review: number,
	display: string,
	formId: string,
}

export const BareSearch = (props: BareSearchProps) => {
	const { onSubmit, checkedList, onTagChange, onPriceChange, price, onReviewChange, review, display, formId } = props

	return (
		<form
			style={{ width: display === 'COLUMN' ? '100%' : '500px' }}
			className={`drop--shadow p-2 ${display ? `search__container--${display}` : 'search__container'}`}
			onSubmit={onSubmit}>
			<div style={{ gridArea: 'tag' }} className="ctn--stack">
				<label className="search__label">Loại hình</label>
				<TagFilter checkedList={checkedList}
					onChange={(event) => onTagChange(
						event.currentTarget.getAttribute('name'),
						event.currentTarget.checked,
					)} />
			</div>
			<div style={{ gridArea: 'slider' }} className={`ctn--stack ${display === 'COLUMN' ? 'search__range--column pr-2 pl-2' : 'search__range pr-2 pl-3'}`}>
				<div style={{ gridArea: 'price' }}>
					<label className="search__label">Giá cả</label>
					<PriceFilter
						onChange={onPriceChange}
						value={price} />
					<hr />
				</div>
				<div style={{ gridArea: 'review' }}>
					<label className="search__label">Đánh giá</label>
					<ReviewFilter
						formId={formId}
						onChange={(event) => onReviewChange(event.currentTarget.value)}
						value={review} />
					<hr />
				</div>
				<div style={{ gridArea: 'spacing' }}></div>
				<div style={{ gridArea: 'action' }}>
					<input type="submit" className="btn btn-success ctn--fluid" value="Tìm kiếm" />
				</div>
			</div>
			<div style={{ gridArea: 'space' }}></div>
		</form>
	)
}