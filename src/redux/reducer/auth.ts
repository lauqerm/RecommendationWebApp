import { AuthAction } from '../action/auth'

export interface AuthorizeState {
	authStatus: boolean,
	token: string,
}

const _authorization = {
	authStatus: false,
	token: '',
}

export const authorization = (state = _authorization, action: AuthAction): AuthorizeState => {
	console.log('reducer')
	switch (action.type) {
		case 'ADD_TOKEN': return {
			authStatus: true,
			token: action.token
		}
		default: return state
	}
}