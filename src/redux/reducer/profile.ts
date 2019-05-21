import { AuthorizeState } from './auth'
import { ProfileAction } from '../action/profile'

const $authorization = {
	authStatus: false,
	token: '',
	currentUserId: '',
	username: '',
	role: 'user',
}

export const profile = (state = $authorization, action: ProfileAction): AuthorizeState => {
	switch (action.type) {
		case 'CHANGE_USERNAME': return {
			...state,
			username: action.username
		}
		default: return state
	}
}