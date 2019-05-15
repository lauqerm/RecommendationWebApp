import { auth } from '../../redux/action'
import { AuthAction } from '../../redux/action/auth'
import { Dispatch } from 'react'

export type AuthDispatcher = (token: string, userId: string, username: string, role: string) => AuthAction
export const mapAuthDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
	return {
		auth: (token: string, userId: string, username: string, role: string) => {
			return dispatch(auth(token, userId, username, role))
		},
	}
}