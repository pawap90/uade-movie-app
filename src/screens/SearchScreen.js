import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import MediaTypeSwitch from '../components/MediaTypeSwitch';
import BaseStyles from '../BaseStyles';

SearchScreen.propTypes = {
	navigation: PropTypes.object
};

export default function SearchScreen(props) {
	const { route } = props;
	const { searchTerm = 'jurassic' } = route.params;

	const page = 1;

	const [searchResult, setSearchResult] = useState({});

	useEffect(() => {
		searchMovies(page, searchTerm)
	}, [])

	const searchMovies = async (page, searchTerm) => {
		const result = await MovieDbService.searchMovies(page, searchTerm);
		setSearchResult(result);
	}

	const searchSeries = async (page, searchTerm) => {
		const result = await MovieDbService.searchSeries(page, searchTerm);
		setSearchResult(result);
	}

	return (
		<ScrollView style={BaseStyles.container}>
			<MediaTypeSwitch onClickMovie={() => { searchMovies(1, searchTerm) }} onClickSeries={() => { searchSeries(1, searchTerm) }}></MediaTypeSwitch>
			<View style={styles.header}>
				<Text style={styles.title}>Resultados</Text>
				<Text style={styles.totalResults}>{`${searchResult.total} items`}</Text>
			</View>
		</ScrollView>
	);


}



const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34424F',
		padding: 24
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginVertical: 10
	},
	title: {
		color: '#FFFFFF',
		fontSize: 24
	},
	totalResults: {
		color: '#FFFFFF',
		opacity: 0.7,
		fontSize: 18
	}
});