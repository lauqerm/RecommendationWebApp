import React, {
	createRef,
	ReactChild,
	RefObject,
	useEffect,
	useState
	} from 'react'
import { mergeRight } from 'ramda'
import { override, useClientRect } from '../../com'
import './Dropdown.scss'

export enum Edge { UP, DOWN, LEFT, RIGHT }
export enum Align { CENTER, UP, DOWN, LEFT, RIGHT }

export type DropdownMeta = {
	edge?: Edge,
	align?: Align,
	allowOverflow: boolean,
	smart?: boolean,
}

export const withDropdown = (element: ReactChild, dropElement: ReactChild, meta?: DropdownMeta, forceOpen?: boolean) => {
	const defaultMeta: DropdownMeta = {
		edge: Edge.UP,
		align: Align.RIGHT,
		allowOverflow: false,
	}
	const _meta = mergeRight(defaultMeta, meta)
	const [isOpen, toggleOpen] = useState(false)
	const [position, setPosition] = useState({
		left: 0,
		top: 0,
	})
	if (forceOpen !== undefined) toggleOpen(override(isOpen, forceOpen))

	// const [rectDrop, refDrop] = useClientRect()
	// const [rectCont, refCont] = useClientRect()
	// console.log(rectCont)
	// const { width, height } = rectCont as unknown as DOMRect
	// const position = ((width: number, height: number) => {
	// 	return {
	// 		left: width,
	// 		top: height,
	// 	}
	// })(width, height)
	let refCont = createRef() as RefObject<HTMLDivElement>

	useEffect(() => {
		console.log('INSIDE EFFECT')
		const currentRef = refCont.current
		if (currentRef !== null) {
			const { height } = currentRef.getBoundingClientRect()
			setPosition({
				top: height,
				left: 0,
			})
		}
	}, [position.top])
	console.log('RENDER')
	return (
		<div ref={refCont} onClick={() => toggleOpen(!isOpen)} className="dropdown_container">
			{element}
			<div style={position} className="dropdown__drop" >
				{dropElement}
			</div>
		</div>
	)
}
