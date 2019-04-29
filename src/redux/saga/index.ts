import history from '../../route/history'
import { AnyAction } from 'redux'
import { call, put, takeLatest } from 'redux-saga/effects'

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
				yield call(() => window.localStorage.removeItem('TOKEN'))
				yield call(() => window.localStorage.removeItem('ID'))
				yield history.push('/logout')
				yield put({ type: 'LOGGED_OUT' })
				break
			}
		}
	} catch (e) {
		yield put({ type: 'AUTH_WRITTEN', token: '', id: '' })
	}
}

function* sagaToken() {
	yield takeLatest(['AUTH', 'LOGOUT'], manipulateToken);
}

export default sagaToken