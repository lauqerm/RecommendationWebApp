import history from '../../route/history'
import { AnyAction } from 'redux'
import {
	call,
	put,
	putResolve,
	take,
	takeEvery,
	takeLatest
	} from 'redux-saga/effects'

function* manipulateToken(action: AnyAction) {
	try {
		const { type } = action
		const { token, id } = action
		switch (type) {
			case 'AUTH': {
				yield call((token: string) => window.localStorage.setItem('TOKEN', token), token)
				yield call((id: string) => window.localStorage.setItem('ID', id), id)
				yield put({ type: 'AUTH_WRITTEN', token, id })
				break
			}
			case 'LOGOUT': {
				yield put({ type: 'LOGGED_OUT' })
				yield call(() => {
					window.localStorage.removeItem('TOKEN')
					window.localStorage.removeItem('ID')
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
		yield put({ type: 'AUTH_WRITTEN', token: '', id: '' })
	}
}

function* sagaToken() {
	yield takeEvery(['AUTH', 'LOGOUT', 'LOGGED_OUT'], manipulateToken)
}

export default sagaToken