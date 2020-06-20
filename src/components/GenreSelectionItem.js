import React, { useState } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

GenreSelectionItem.propTypes = {
	genreName: PropTypes.string
};

export default function GenreSelectionItem(props) {
	const { genreName } = props;
	const [selectedOrNot, setselectedOrNot] = useState(false);

	const genreBoxPressed = () => {
		setselectedOrNot( prevState => {selectedOrNot: !prevState.selectedOrNot})
	};

	return (
		<TouchableWithoutFeedback style={styles.genreSection} onPress={genreBoxPressed}>
			<Text style={styles.genreName}>{genreName}</Text>
		</TouchableWithoutFeedback>
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