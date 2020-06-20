import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

GenreSelectionItem.propTypes = {
	genreName: PropTypes.string
};

export default function GenreSelectionItem(props) {
	const { genreName } = props;
	const [selectedOrNot, setselectedOrNot] = useState(false);

	const genreBoxPressed = () => {
		if (setselectedOrNot)
			setselectedOrNot(false);
		else
			setselectedOrNot(true);
	};

	return (
		<View style={styles.genreSection} onPress={genreBoxPressed}>
			<Text style={styles.genreName}>{genreName}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	genreName: {
		fontSize: 15,
		color: '#FFFFFF',
		padding: 12,
		textAlign: "center",
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	genreSection: {
		backgroundColor: '#1F2D3D',
		borderWidth: 1.5,
		borderColor: '#60C7AC',
	}
});