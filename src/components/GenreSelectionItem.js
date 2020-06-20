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
		backgroundColor: 'rgba(0,0,0,.5)',
		color: '#FFFFFF',
		padding: 12
	},
	genreSection: {
		color: '#FFFFFF'
	}
});