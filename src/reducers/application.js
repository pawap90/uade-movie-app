const initialState = {
	isLoading: false,
	isLoggedIn: false,
	accessToken: null
};

const applicationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_SPINNER':
			return { ...state, isLoading: true };
		case 'HIDE_SPINNER':
			return { ...state, isLoading: false };
		case 'LOGGED_IN':
			return { ...state, isLoggedIn: true, accessToken: action.token };
		case 'LOGGED_OUT':
			return { ...state, isLoggedIn: false, accessToken: null };
		default:
			return state;
	}
};

export default applicationReducer;