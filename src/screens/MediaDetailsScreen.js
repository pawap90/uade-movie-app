import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import BaseStyles from '../BaseStyles';

import PropTypes from 'prop-types';

MediaDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object
};

export default function MediaDetailsScreen(props) {
	// Get Media item id from navigator
	const { route } = props;
	const { id } = route.params;

	return (
		<ScrollView style={BaseStyles.container}>
			<Text style={styles.label}>Pantalla de detalle de pelicula {id}</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	label: {
		color: '#FFFFFF'
	}
});