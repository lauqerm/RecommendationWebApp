export type AuthAction =
	| { type: 'ADD_TOKEN'; token: string }
	| { type: 'ADD_USER_ID'; id: string }
	| { type: 'AUTH'; token: string, id: string, username: string, role: string, }
	| { type: 'AUTH_WRITTEN'; token: string, id: string, username: string, role: string, }
	| { type: 'LOGOUT' }
	| { type: 'LOGGED_OUT' }
	| { type: 'CHANGE_USERNAME'; username: string }
	| { type: 'CHANGE_USERNAME_SUCCEED'; username: string }

export const addToken = (token: string): AuthAction => ({
	token,
	type: 'ADD_TOKEN',
})

export const addUserId = (id: string): AuthAction => ({
	id,
	type: 'ADD_USER_ID',
})

export const logout = (): AuthAction => ({
	type: 'LOGOUT',
})

export const auth = (token: string, id: string, username: string, role: string): AuthAction => ({
	token,
	id,
	username,
	role,
	type: 'AUTH',
})

export const changeUsername = (username: string): AuthAction => ({
	username,
	type: 'CHANGE_USERNAME',
})