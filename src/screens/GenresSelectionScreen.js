import React from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import GenreSelectionItem from '../components/GenreSelectionItem';
import ButtonPrimaryActionWithoutIcon from '../components/ButtonPrimaryActionWithoutIcon';


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
	const title = 'Seleccioná tus géneros preferidos';
	const buttonLabel = 'Guardar Cambios';

	return (
		<ScrollView contentContainerStyle={{ ...BaseStyles.container, ...styles.containerAdaptations }}>
			<View>
				<Text style={styles.title}>{title}</Text>
				<FlatList
					style={styles.genresList}
					data={GENRES}
					renderItem={({ item }) => <GenreSelectionItem genreName={item.genreName} />}
					keyExtractor={item => item.id}
				/>
			</View>

			<ButtonPrimaryActionWithoutIcon text={buttonLabel}></ButtonPrimaryActionWithoutIcon>
		</ScrollView >

	);
}

const styles = StyleSheet.create({
	containerAdaptations: {
		display: 'flex',
		justifyContent: 'space-between',
		flexGrow: 1
	},
	title: {
		color: '#FFFFFF',
		fontSize: 25,
		marginVertical: 32,
	},
	genresList: {
		display: 'flex',
	}
});