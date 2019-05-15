import { AuthAction } from '../action/auth'

export interface AuthorizeState {
	authStatus: boolean,
	token: string,
	currentUserId: string,
	username: string,
	role: string,
}

const $authorization = {
	authStatus: false,
	token: '',
	currentUserId: '',
	username: '',
	role: 'user',
}

export const authorization = (state = $authorization, action: AuthAction): AuthorizeState => {
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
		case 'LOGGED_OUT': return {
			...state,
			...$authorization,
		}
		case 'AUTH_WRITTEN': {
			const { id, username, token, role } = action

			return {
				...state,
				authStatus: true,
				currentUserId: id,
				username: username,
				token: token,
				role: role,
			}
		}
		default: return state
	}
}