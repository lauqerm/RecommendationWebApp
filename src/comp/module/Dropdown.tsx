import { mergeRight } from 'ramda'
import './Dropdown.scss'
import React, {
	createRef,
	RefObject,
	ReactChild,
} from 'react'

export type DropdownMeta = {
	edge?: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT',
	align?: 'CENTER' | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT',
	smart?: boolean,
}
export type DropdownType = {
	child: ReactChild,
	drop: ReactChild,
	_meta?: DropdownMeta,
	overrideStatus?: boolean
}

// value already valid in withDropdown
const getPosition = (contSize: ClientRect, dropSize: ClientRect, meta: DropdownMeta) => {
	const { edge, align, smart } = meta
	const code = `${edge}_${align}`
	const { height: contHeight, width: contWidth } = contSize
	const { height: dropHeight, width: dropWidth } = dropSize
	let top = 0, left = 0
	switch (code) {
		case 'TOP_LEFT': {
			top = contHeight
			break
		}
		case 'TOP_CENTER': {
			top = contHeight
			left = (contWidth - dropWidth) / 2
			break
		}
		case 'TOP_RIGHT': {
			top = contHeight
			left = (contWidth - dropWidth)
			break
		}
		case 'BOTTOM_LEFT': {
			top = contHeight
			break
		}
		case 'BOTTOM_CENTER': {
			top = contHeight
			left = (contWidth - dropWidth) / 2
			break
		}
		case 'BOTTOM_RIGHT': {
			top = contHeight
			left = (contWidth - dropWidth)
			break
		}
		case 'LEFT_TOP': {
			left = contWidth
			break
		}
		case 'LEFT_CENTER': {
			left = contWidth
			top = (contHeight - dropHeight) / 2
			break
		}
		case 'LEFT_BOTTOM': {
			left = contWidth
			top = contHeight - dropHeight
			break
		}
		case 'RIGHT_TOP': {
			left = -dropWidth
			break
		}
		case 'RIGHT_CENTER': {
			left = -dropWidth
			top = (contHeight - dropHeight) / 2
			break
		}
		case 'RIGHT_BOTTOM': {
			left = -dropWidth
			top = contHeight - dropHeight
			break
		}
	}
	return { top, left }
}

export class Dropdown extends React.Component<DropdownType> {
	defaultMeta: DropdownMeta = {
		edge: 'TOP',
		align: 'RIGHT',
		smart: true,
	}
	meta = mergeRight(this.defaultMeta, this.props._meta)
	isOpen = false || this.props.overrideStatus
	refCont = createRef() as RefObject<HTMLDivElement>
	refDrop = createRef() as RefObject<HTMLDivElement>
	toggleState = () => {
		this.isOpen = !this.isOpen
		const currentCont = this.refCont.current
		const currentDrop = this.refDrop.current

		if (currentDrop !== null && currentCont !== null) {
			const { top, left } = getPosition(
				currentCont.getBoundingClientRect(),
				currentDrop.getBoundingClientRect(),
				this.meta)

			currentDrop.style.top = `${top}px`
			currentDrop.style.left = `${left}px`
			currentDrop.style.visibility = this.isOpen ? 'visible' : 'hidden'
		}
	}
	render() {
		const { child, drop } = this.props
		return (
			<div ref={this.refCont} onClick={this.toggleState} className="dropdown_container">
				{child}
				<div ref={this.refDrop} className="dropdown__drop" >
					{drop}
				</div>
			</div>
		)
	}
}
