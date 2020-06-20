
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Spinner = (props) => {

	const { applicationState } = props;

	if (!applicationState.isLoading)
		return null;

	return (
		<ActivityIndicator style={styles.container} size="large" color="#E6D72A" />
	);
};

Spinner.propTypes = {
	applicationState: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1F2D3D',
		position: 'absolute',
		zIndex: 1000,
		width: '100%',
		height: '100%',
		opacity: 0.75
	}
});

const mapStateToProps = (state) => {
	return {
		applicationState: {
			isLoading: state.isLoading
		}
	};
};

export default connect(mapStateToProps)(Spinner);