import React, { useEffect, useState } from 'react';
import { ScrollView, Button } from 'react-native';
import MediaCarousel from '../components/MediaCarousel';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import MediaTypeSwitch from '../components/MediaTypeSwitch';

HomeScreen.propTypes = {
	navigation: PropTypes.object
};

export default function HomeScreen() {

	const [mediaType, setMediaType] = useState('movie');
	const [topRatedMedia, setTopRatedMedia] = useState([]);
	const [popularMedia, setPopularMedia] = useState([]);
	const [upcomingMedia, setUpcomingMedia] = useState([]);

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
		const getUpcomingMedia = async () => {
			const results = mediaType === 'movie' ? await MovieDbService.getUpcomingMovies() : await MovieDbService.getUpcomingSeries();
			setUpcomingMedia(results);
		};
		getTopRatedMedia();
		getPopularMedia();
		getUpcomingMedia();
	}, [mediaType]);

	return (
		<ScrollView style={BaseStyles.container}>
			<MediaTypeSwitch onClickMovie={() => onMediaTypeSelected('movie')} onClickSeries={() => onMediaTypeSelected('serie')}></MediaTypeSwitch>
			<MediaCarousel title="Mejor valoradas" items={topRatedMedia} buttonLabel="Ver más +" />
			<MediaCarousel title="Según su popularidad" items={popularMedia} buttonLabel="Ver más +" width={130} height={250} />
			<MediaCarousel title="Proximamente" items={upcomingMedia} buttonLabel="Ver más +" width={130} height={250} />
		</ScrollView>
	);
}