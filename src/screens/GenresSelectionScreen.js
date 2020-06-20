import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import { GenreSelectionItem } from '../components/GenreSelectionItem';

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
	var title = 'YOU ARE WATCHING THE TITLE';

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			{/* <ScrollView style={BaseStyles.container}>
				<FlatList
					data={GENRES}
					renderItem={({ item }) => <GenreSelectionItem genreName={genreName} />}
					keyExtractor={item => item.id}
				/>
			</ScrollView> */}
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingLeft: 10,
	},
	title: {
		color: '#FFFFFF',
		fontSize: 24,
	}
});