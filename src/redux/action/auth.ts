export const AUTHORIZE = 'AUTHORIZE'
export const ADD_TOKEN = 'ADD_TOKEN'
export interface AddTokenAction {
	type: string,
	category: string,
	token: string,
}

export const addToken = (token: string): AddTokenAction => ({
	token,
	category: AUTHORIZE,
	type: ADD_TOKEN,
})