import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import GenreSelectionItem from '../components/GenreSelectionItem';

const GENRES = [
	{ genreName: 'Action' },
	{ genreName: 'Black & White' },
	{ genreName: 'Drama' },
	{ genreName: 'Thriller' },
	{ genreName: 'Sci Fi' }
];

GenresSelectionScreen.propTypes = {
	title: PropTypes.string
};

export default function GenresSelectionScreen(props) {
	var title = 'Seleccioná tus géneros preferidos';

	return (
		<ScrollView style={BaseStyles.container}>
			<Text style={styles.title}>{title}</Text>
			<GenreSelectionItem genreName="Action">
			</GenreSelectionItem>
			{/* <ScrollView style={BaseStyles.container}>
				<FlatList
					data={GENRES}
					renderItem={({ item }) => <GenreSelectionItem genreName={genreName} />}
					keyExtractor={item => item.id}
				/>
			</ScrollView> */}
		</ScrollView>

	);
}

const styles = StyleSheet.create({
	title: {
		color: '#FFFFFF',
		fontSize: 24,
		marginVertical: 32,
	}
});