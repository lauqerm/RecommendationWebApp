import { mergeRight } from 'ramda'
import './dropdown.scss'
import React, {
	createRef,
	RefObject,
	ReactChild,
} from 'react'

export type DropdownMeta = {
	edge?: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT',
	align?: 'CENTER' | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT',
	smart?: boolean,
	persist?: boolean
}
export type DropdownType = {
	child: ReactChild,
	drop: ReactChild,
	meta?: DropdownMeta,
	overrideStatus?: boolean
}

// value already valid in withDropdown
const getPosition = (contSize: ClientRect, dropSize: ClientRect, __meta: DropdownMeta) => {
	const { edge, align, smart } = __meta
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
	constructor(props: DropdownType) {
		super(props)
		this.handleOutsideClick.bind(this)
	}
	defaultMeta: DropdownMeta = {
		edge: 'TOP',
		align: 'LEFT',
		smart: true,
		persist: false,
	}
	_meta = mergeRight(this.defaultMeta, this.props.meta)
	isOpen = false || this.props.overrideStatus
	refCont = createRef() as RefObject<HTMLDivElement>
	refDrop = createRef() as RefObject<HTMLDivElement>
	handleOutsideClick = (event: MouseEvent) => {
		event.stopPropagation()
		if(this.refDrop.current !== null)
			if(!this.refDrop.current.contains(event.target as Node)) {
				this.isOpen = true
				this.toggleState()
			}
	}
	toggleState = () => {
		this.isOpen = !this.isOpen
		const currentCont = this.refCont.current
		const currentDrop = this.refDrop.current

		if (currentDrop !== null && currentCont !== null) {
			const { top, left } = getPosition(
				currentCont.getBoundingClientRect(),
				currentDrop.getBoundingClientRect(),
				this._meta)

			currentDrop.style.top = `${top}px`
			currentDrop.style.left = `${left}px`
			currentDrop.style.visibility = this.isOpen ? 'visible' : 'hidden'
		}
	}
	componentDidMount() {
		if (this._meta.persist !== true)
			document.addEventListener('mousedown', this.handleOutsideClick);
	}
	componentWillUnmount() {
		if (this._meta.persist !== true)
			document.removeEventListener('mousedown', this.handleOutsideClick);
	}
	render() {
		const { child, drop } = this.props
		return (
			<div ref={this.refCont} className="dropdown_container">
				<div onClick={this.toggleState} className="dropdown__ele" >{child}</div>
				<div ref={this.refDrop} className="dropdown__drop" >
					{drop}
				</div>
			</div>
		)
	}
}
