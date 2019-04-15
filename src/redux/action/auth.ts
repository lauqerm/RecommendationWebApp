export type AuthAction =
	| { type: 'ADD_TOKEN'; token: string }
	| { type: 'ADD_USER_ID'; id: string }
	| { type: 'AUTH'; token: string, id: string }

export const addToken = (token: string): AuthAction => ({
	token,
	type: 'ADD_TOKEN',
})

export const addUserId = (id: string): AuthAction => ({
	id,
	type: 'ADD_USER_ID',
})

export const auth = (token: string, id: string): AuthAction => ({
	token,
	id,
	type: 'AUTH',
})