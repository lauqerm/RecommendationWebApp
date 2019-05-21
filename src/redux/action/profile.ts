export type ProfileAction =
	| { type: 'CHANGE_USERNAME'; username: string }
	| { type: 'CHANGE_USERNAME_SUCCEED'; username: string }

export const changeUsername = (username: string): ProfileAction => ({
	username,
	type: 'CHANGE_USERNAME',
})