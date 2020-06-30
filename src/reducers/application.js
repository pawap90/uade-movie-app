const initialState = {
	isLoading: false,
	isLoggedIn: false,
	profileNeedsRefresh: false
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
		case 'PROFILE_NEEDS_REFRESH':
			return { ...state, profileNeedsRefresh: true };
		case 'PROFILE_REFRESHED':
			return { ...state, profileNeedsRefresh: false };
		default:
			return state;
	}
};

export default applicationReducer;