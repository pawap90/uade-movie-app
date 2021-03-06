import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import MediaTypeSwitch from '../components/MediaTypeSwitch';
import BaseStyles from '../BaseStyles';
import { FlatList } from 'react-native-gesture-handler';
import MediaSummaryCard from '../components/MediaSummaryCard';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/application';

SearchScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

const MEDIA_TYPE = {
	movie: {
		key: 'movie',
		textSingular: 'película',
		textPlural: 'películas'
	},
	serie: {
		key: 'serie',
		textSingular: 'serie',
		textPlural: 'series'
	}
};

export default function SearchScreen(props) {
	const { route } = props;
	const { searchTerm = 'jurassic' } = route.params;
	const dispatch = useDispatch();
	const [resultHeader, setResultHeader] = useState({ total: 0 });
	const [resultItems, setResultItems] = useState([]);
	const [page, setPage] = useState(1);
	const [endReached, setEndReached] = useState(false);
	const [mediaType, setMediaType] = useState(MEDIA_TYPE.movie.key);

	useEffect(() => {
		search();
	}, [page, mediaType]);

	const search = async () => {
		dispatch(showSpinner);
		let searchResult = {};
		if (mediaType === MEDIA_TYPE.movie.key)
			searchResult = await MovieDbService.searchMovies(page, searchTerm);
		else
			searchResult = await MovieDbService.searchSeries(page, searchTerm);

		if (searchResult && searchResult.results && searchResult.results.length < 20)
			setEndReached(true);

		setResultHeader(searchResult);
		setResultItems([...resultItems, ...searchResult.results]);
		dispatch(hideSpinner);
	};

	const changeMediaType = async (mediaType) => {
		setMediaType(mediaType);
		resetSearch();
	};

	const resetSearch = () => {
		setResultItems([]);
		setResultHeader({ total: 0 });
		setEndReached(false);
		setPage(1);
	};

	const nextPage = useCallback(() => {
		if (endReached)
			return;

		setPage(page + 1);
	});

	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<MediaTypeSwitch
					onClickMovie={() => {
						changeMediaType(MEDIA_TYPE.movie.key); 
					}}
					onClickSeries={() => {
						changeMediaType(MEDIA_TYPE.serie.key); 
					}}
				/>
				<View style={styles.header}>
					<Text style={styles.title}>Resultados</Text>
					<Text style={styles.totalResults}>{
						`${resultHeader.total} ${resultHeader.total == 1 ? MEDIA_TYPE[mediaType].textSingular : MEDIA_TYPE[mediaType].textPlural}`
					}</Text>
				</View>
				<FlatList
					data={resultItems}
					style={styles.list}
					renderItem={({ item }) =>
						<MediaSummaryCard
							id={item.id}
							title={item.title}
							imageUrl={item.imageUrl}
							genres={item.genres}
							year={item.year}
							summary={item.summary}
							mediaType={mediaType}
						/>}
					keyExtractor={item => item.id.toString()}
					onEndReachedThreshold={0.1}
					onEndReached={() => {
						resultItems.length > 0 && nextPage(); 
					}}
				/>
			</View>
		</>
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