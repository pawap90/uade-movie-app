
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Modal } from 'react-native';
import PropTypes from 'prop-types';

const Spinner = (props) => {

	const { applicationState } = props;

	if (!applicationState.isLoading)
		return null;

	return (
		<Modal 
			animationType="fade"
			transparent={true}
			isVisible={applicationState.isLoading}>
			<ActivityIndicator style={styles.container} size="large" color="#E6D72A" />
		</Modal>
	);
};

Spinner.propTypes = {
	applicationState: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(31,45,61,.7)',
		position: 'absolute',
		zIndex: 1000,
		width: '100%',
		height: '100%'
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