import { objectToArray, override } from './shorten'

function debounce (func: any, wait: number, immediate: boolean = false) {
	var timeout: any

	return function executedFunction(this: any) {
		var context = this
		var args = arguments

		var later = function () {
			timeout = undefined
			if (!immediate) func.apply(context, args)
		}

		var callNow = immediate && !timeout

		clearTimeout(timeout)

		timeout = setTimeout(later, wait)

		if (callNow) func.apply(context, args)
	}
}

export {
	override,
	debounce,
	objectToArray,
}