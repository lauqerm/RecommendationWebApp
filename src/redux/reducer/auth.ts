import { AuthAction } from '../action/auth'

export interface AuthorizeState {
	authStatus: boolean,
	token: string,
	currentUserId: string,
}

const _authorization = {
	authStatus: false,
	token: '',
	currentUserId: '',
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
			currentUserId: action.id
		}
		case 'AUTH': return {
			...state,
			authStatus: true,
			currentUserId: action.id,
			token: action.token
		}
		default: return state
	}
}