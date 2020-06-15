import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import MediaTypeSwitch from '../components/MediaTypeSwitch';
import BaseStyles from '../BaseStyles';
import { FlatList } from 'react-native-gesture-handler';
import MediaSummaryCard from '../components/MediaSummaryCard';

SearchScreen.propTypes = {
	navigation: PropTypes.object
};

const MEDIA_TYPE = {
	movies: {
		key: 'movies',
		textSingular: 'película',
		textPlural: 'películas'
	},
	series: {
		key: 'series',
		textSingular: 'serie',
		textPlural: 'series'
	}
}

export default function SearchScreen(props) {
	const { route } = props;
	const { searchTerm = 'jurassic' } = route.params;

	const [resultHeader, setResultHeader] = useState({ total: 0 });
	const [resultItems, setResultItems] = useState([]);
	const [page, setPage] = useState(1);
	const [endReached, setEndReached] = useState(false);
	const [mediaType, setMediaType] = useState(MEDIA_TYPE.movies.key);

	useEffect(() => {
		search();
	}, [page])

	const search = async () => {
		let searchResult = {};
		if (mediaType === MEDIA_TYPE.movies.key)
			searchResult = await MovieDbService.searchMovies(page, searchTerm);
		else
			searchResult = await MovieDbService.searchSeries(page, searchTerm);

		if (searchResult && searchResult.results && searchResult.results.length < 20)
			setEndReached(true);

		setResultHeader(searchResult);
		setResultItems([...resultItems, ...searchResult.results]);
	}

	const changeMediaType = asynnpmc (mediaType) => {
		setMediaType(mediaType);
		resetSearch();
	}

	const resetSearch = () => {
		setResultItems([]);
		setResultHeader({ total: 0 });
		setEndReached(false);
		setPage(1);
	}

	const nextPage = useCallback(() => {
		if (endReached)
			return;

		setPage(page + 1);
	});

	return (
		<View style={BaseStyles.container}>
			<MediaTypeSwitch
				onClickMovie={() => { changeMediaType(MEDIA_TYPE.movies.key); }}
				onClickSeries={() => { changeMediaType(MEDIA_TYPE.series.key) }}
			/>
			<View style={styles.header}>
				<Text style={styles.title}>Resultados</Text>
				<Text style={styles.totalResults}>{
					`${resultHeader.total} ${resultHeader.total == 1 ? MEDIA_TYPE[mediaType].textSingular : MEDIA_TYPE[mediaType].textPlural} page ${page} loaded ${resultItems.length}`
				}</Text>
			</View>
			<FlatList
				data={resultItems}
				renderItem={({ item }) =>
					<MediaSummaryCard
						id={item.id}
						title={item.title}
						imageUrl={item.imagePath}
						genres={item.genres}
						year={item.year}
						summary={item.summary}
					/>}
				keyExtractor={item => item.id}
				onEndReachedThreshold={0.1}
				onEndReached={nextPage}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34424F',
		padding: 24
	},
	header: {
		display: 'flex',
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