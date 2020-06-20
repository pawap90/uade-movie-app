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
		if (selectedOrNot)
			setselectedOrNot(false);
		else
			setselectedOrNot(true);
	};

	return (
		<View style={selectedOrNot?styles.genreSectionSelected:styles.genreSectionDefault} onPress={genreBoxPressed}>
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
	genreSectionDefault: {
		backgroundColor: '#1F2D3D',
		borderWidth: 1.5,
		borderColor: '#60C7AC',
	},
	genreSectionSelected: {
		backgroundColor: '#60C7AC',
		borderWidth: 1.5,
		borderColor: '#60C7AC',
	},
});