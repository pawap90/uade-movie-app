const initialState = {
	isLoading: false
};

const applicationReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SHOW_SPINNER':
		return { ...state, isLoading: true };
	case 'HIDE_SPINNER':
		return { ...state, isLoading: false };
	default:
		return state;
	}
};

export default applicationReducer;