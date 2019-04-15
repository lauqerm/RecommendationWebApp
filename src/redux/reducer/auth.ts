import { AuthAction } from '../action/auth'

export interface AuthorizeState {
	authStatus: boolean,
	token: string,
	userId: string,
}

const _authorization = {
	authStatus: false,
	token: '',
	userId: '',
}

export const authorization = (state = _authorization, action: AuthAction): AuthorizeState => {
	switch (action.type) {
		case 'ADD_TOKEN': return {
			...state,
			authStatus: true,
			token: action.token
		}
		case 'ADD_USER_ID': return {
			...state,
			authStatus: true,
			userId: action.id
		}
		case 'AUTH': return {
			...state,
			authStatus: true,
			userId: action.id,
			token: action.token
		}
		default: return state
	}
}