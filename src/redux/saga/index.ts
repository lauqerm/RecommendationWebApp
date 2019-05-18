import history from '../../route/history'
import { AnyAction } from 'redux'
import { AuthAction } from '../action/auth'
import {
	call,
	put,
	takeEvery,
	} from 'redux-saga/effects'

function* manipulateToken(action: AnyAction) {
	try {
		const { type } = action
		const { token, id, username, role } = action
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
				yield put<AuthAction>({ type: 'LOGGED_OUT' })
				yield call(() => {
					window.localStorage.removeItem('TOKEN')
					window.localStorage.removeItem('ID')
					window.localStorage.removeItem('USERNAME')
					window.localStorage.removeItem('ROLE')
				})
				break
			}
			case 'LOGGED_OUT': {
				yield call(() => {
					history.push('/')
				})
				break
			}
		}
	} catch (e) {
		yield put<AuthAction>({ type: 'AUTH_WRITTEN', token: '', id: '', username: '', role: 'user' })
	}
}

function* sagaToken() {
	yield takeEvery(['AUTH', 'LOGOUT', 'LOGGED_OUT'], manipulateToken)
}

export default sagaToken