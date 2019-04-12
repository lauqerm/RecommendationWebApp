export type AuthAction =
	| { type: 'ADD_TOKEN'; token: string }

export const addToken = (token: string): AuthAction => ({
	token,
	type: 'ADD_TOKEN',
})