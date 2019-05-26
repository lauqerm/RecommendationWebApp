import { AnyAction } from 'redux'
import { AuthAction } from '../action/auth'
import {
	call,
	put,
	takeEvery,
} from 'redux-saga/effects'

function* manipulateToken(action: AnyAction) {
	try {
		const { type, token, id, username, role } = action
		switch (type) {
			case 'AUTH': {
				yield call((token: string) => window.localStorage.setItem('TOKEN', token), token)
				yield call((id: string) => window.localStorage.setItem('ID', id), id)
				yield call((username: string) => window.localStorage.setItem('USERNAME', username), username)
				yield call((role: string) => window.localStorage.setItem('ROLE', role), role)
				yield put<AuthAction>({ type: 'AUTH_WRITTEN', token, id, username, role })
				break
			}
			case 'LOGOUT': {
				yield call(() => {
					window.localStorage.removeItem('TOKEN')
					window.localStorage.removeItem('ID')
					window.localStorage.removeItem('USERNAME')
					window.localStorage.removeItem('ROLE')
				})
				yield put<AuthAction>({ type: 'LOGGED_OUT' })
				break
			}
			case 'CHANGE_USERNAME': {
				yield call((username: string) => window.localStorage.setItem('USERNAME', username), username)
				yield put<AuthAction>({ type: 'CHANGE_USERNAME_SUCCEED', username })
				break
			}
		}
	} catch (e) {
		yield put<AuthAction>({ type: 'AUTH_WRITTEN', token: '', id: '', username: '', role: 'user' })
	}
}

function* sagaToken() {
	yield takeEvery(['AUTH', 'LOGOUT', 'CHANGE_USERNAME'], manipulateToken)
}

export default sagaToken