const initialState = {
	isLoading: false,
	isLoggedIn: false,
	listsNeedsRefresh: false
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
		case 'LISTS_NEEDS_REFRESH':
			return { ...state, listsNeedsRefresh: true };
		case 'LISTS_REFRESHED':
			return { ...state, listsNeedsRefresh: false };
		default:
			return state;
	}
};

export default applicationReducer;