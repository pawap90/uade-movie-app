import React, { useEffect, useState } from 'react';
import { ScrollView, Button } from 'react-native';
import MediaCarousel from '../components/MediaCarousel';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';

HomeScreen.propTypes = {
	navigation: PropTypes.object
};

export default function HomeScreen() {

	const [mediaType, setMediaType] = useState('movie');
	const [topRatedMedia, setTopRatedMedia] = useState([]);
	const [popularMedia, setPopularMedia] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [airingTodaySeries, setAiringTodaySeries] = useState([]);

	const onMediaTypeSelected = (type) => {
		if (mediaType === type)
			return;

		setMediaType(type);
	};

	useEffect(() => {
		const getTopRatedMedia = async () => {
			const results = mediaType === 'movie' ? await MovieDbService.getTopRatedMovies() : await MovieDbService.getTopRatedSeries();
			setTopRatedMedia(results);
		};
		const getPopularMedia = async () => {
			const results = mediaType === 'movie' ? await MovieDbService.getPopularMovies() : await MovieDbService.getPopularSeries();
			setPopularMedia(results);
		};
		const getUpcomingMovies = async () => {
			const results = await MovieDbService.getUpcomingMovies();
			setUpcomingMovies(results);
		};
		const getAiringTodaySeries = async () => {
			const results = await MovieDbService.getAiringTodaySeries();
			setAiringTodaySeries(results);
		};

		mediaType === 'movie' ? getUpcomingMovies() : getAiringTodaySeries();

		getTopRatedMedia();
		getPopularMedia();
	}, [mediaType]);

	return (
		<ScrollView style={BaseStyles.container}>
			<Button onPress={() => onMediaTypeSelected('movie')} title="Movies" />
			<Button onPress={() => onMediaTypeSelected('serie')} title="Series" />
			<MediaCarousel mediaType={mediaType} title="Mejor valoradas" items={topRatedMedia} buttonLabel="Ver más +" />
			<MediaCarousel mediaType={mediaType} title="Según su popularidad" items={popularMedia} buttonLabel="Ver más +" width={130} height={250} />
			<MediaCarousel
				mediaType={mediaType}
				title={mediaType === 'movie' ? 'Proximamente' : 'Transmitiéndose hoy'}
				items={mediaType === 'movie' ? upcomingMovies : airingTodaySeries} 
				buttonLabel="Ver más +" 
				width={130} 
				height={250} />
		</ScrollView>
	);
}