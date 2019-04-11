import { AddTokenAction } from '../action/auth'

export interface AuthorizeState {
	authStatus: boolean,
	token: string,
}

const _authorization = {
	authStatus: false,
	token: '',
}

export const authorization = (state = _authorization, action: AddTokenAction): AuthorizeState => {
	switch (action.type) {
		case 'AUTHORIZE': return {
			authStatus: true,
			token: action.token
		}
		default: return state
	}
}