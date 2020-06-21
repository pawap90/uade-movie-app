import { connect } from 'react-redux';
import React from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const SearchButton = (props) => {
	const { applicationState } = props;
	const navigation = useNavigation();

	if (applicationState.isLoading)
		return null;

	return (
		<TouchableWithoutFeedback onPress={() => navigation.push('Search', { searchTerm: 'jurassic' })}>
			<Text style={{ paddingHorizontal: 10, color: '#FFFFFF' }}>Buscar</Text>
		</TouchableWithoutFeedback>
	);
};

SearchButton.propTypes = {
	applicationState: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		applicationState: {
			isLoading: state.isLoading
		}
	};
};

export default connect(mapStateToProps)(SearchButton);