import React from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import GenreSelectionItem from '../components/GenreSelectionItem';
import ButtonWithIcon from '../components/ButtonWithIcon';


const GENRES = [
	{
		genreName: 'Action',
		id: '1'
	},
	{
		genreName: 'Black & White',
		id: '2'
	},
	{
		genreName: 'Drama',
		id: '3'
	},
	{
		genreName: 'Thriller',
		id: '4'
	},
	{
		genreName: 'Sci Fi',
		id: '5'
	},
	{
		genreName: 'Darkful',
		id: '6'
	},
	{
		genreName: 'Philossofical',
		id: '7'
	},
	{
		genreName: 'Bakery',
		id: '8'
	},
	{
		genreName: 'Crime',
		id: '9'
	}
];

GenresSelectionScreen.propTypes = {
	title: PropTypes.string
};

export default function GenresSelectionScreen(props) {
	var title = 'Seleccioná tus géneros preferidos';

	return (
		<SafeAreaView style={BaseStyles.container}>
			<Text style={styles.title}>{title}</Text>
			<GenreSelectionItem genreName="Action">
			</GenreSelectionItem>

			<FlatList
				data={GENRES}
				renderItem={({ item }) => <GenreSelectionItem genreName={item.genreName} />}
				keyExtractor={item => item.id}
			/>

			<ButtonWithIcon></ButtonWithIcon>
		</SafeAreaView >

	);
}

const styles = StyleSheet.create({
	title: {
		color: '#FFFFFF',
		fontSize: 24,
		marginVertical: 32,
	}
});