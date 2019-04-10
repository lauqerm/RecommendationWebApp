import React, {
	createRef,
	ReactChild,
	RefObject,
	useEffect,
	useState
	} from 'react'
import { mergeRight } from 'ramda'
import { override } from '../../com'
import './Dropdown.scss'

export type DropdownMeta = {
	edge?: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT',
	align?: 'CENTER' | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT',
	smart?: boolean,
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

export const withDropdown = (element: ReactChild, dropElement: ReactChild, meta?: DropdownMeta, overrideStatus?: boolean) => {
	const defaultMeta: DropdownMeta = {
		edge: 'TOP',
		align: 'RIGHT',
		smart: true,
	}
	const _meta = mergeRight(defaultMeta, meta)

	const [isOpen, toggleOpen] = useState(false)
	if (overrideStatus !== undefined && overrideStatus !== isOpen)
		toggleOpen(override(isOpen, overrideStatus))

	useEffect(() => {
		const currentCont = refCont.current
		const currentDrop = refDrop.current

		if (currentDrop !== null && currentCont !== null) {
			const { top, left } = getPosition(
				currentCont.getBoundingClientRect(),
				currentDrop.getBoundingClientRect(),
				_meta)

			currentDrop.style.top = `${top}px`
			currentDrop.style.left = `${left}px`
			currentDrop.style.visibility = isOpen ? 'visible' : 'hidden'
		}
	})

	let refCont = createRef() as RefObject<HTMLDivElement>
	let refDrop = createRef() as RefObject<HTMLDivElement>
	return (
		<div ref={refCont} onClick={() => toggleOpen(!isOpen)} className="dropdown_container">
			{element}
			<div ref={refDrop} className="dropdown__drop" >
				{dropElement}
			</div>
		</div>
	)
}
