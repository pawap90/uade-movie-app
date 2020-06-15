import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
			<MediaTypeSwitch  style={styles.mediaTypeSwitch} onClickMovie={() => onMediaTypeSelected('movie')} onClickSeries={() => onMediaTypeSelected('serie')}></MediaTypeSwitch>
			<MediaCarousel mediaType={mediaType} style={styles.carousel} title="Mejor valoradas" items={topRatedMedia} buttonLabel="Ver más +" />
			<MediaCarousel mediaType={mediaType} style={styles.carousel} title="Según su popularidad" items={popularMedia} buttonLabel="Ver más +" width={130} height={250} />
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

const styles = StyleSheet.create({
	mediaTypeSwitch: {
		marginVertical: 10
	},
	carousel: {
		marginVertical: 12
	}
});