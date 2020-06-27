export const showSpinner = {
	type: 'SHOW_SPINNER'
};

export const hideSpinner = {
	type: 'HIDE_SPINNER'
};

export const login = (token) => {
	return {
		type: 'LOGGED_IN',
		token: token
	}
};

export const logout = {
	type: 'LOGGED_OUT'
};