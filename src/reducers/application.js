const initialState = {
	isLoading: false,
	isLoggedIn: false
};

const applicationReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SHOW_SPINNER':
		return { ...state, isLoading: true };
	case 'HIDE_SPINNER':
		return { ...state, isLoading: false };
	case 'LOGGED_IN':
		return { ...state, isLoggedIn: true };
	case 'LOGGED_OUT':
		return { ...state, isLoggedIn: false };
	default:
		return state;
	}
};

export default applicationReducer;