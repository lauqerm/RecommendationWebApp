import { AnyAction } from 'redux'
import { authorization } from './auth'

const defaultRootState: any = {}
const root = (state = defaultRootState, action: AnyAction) => {
	const reducers: {
		[key: string]: (state: any, action: any) => any
	} = {
		authorization
	}

	const nextState = Object.keys(reducers).reduce((nextState: any, key: string) => {
		nextState[key] = reducers[key](state[key], action)
		return nextState
	}, {})

	return nextState
}

export default root