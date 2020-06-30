import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MediaCarousel from '../components/MediaCarousel';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import MediaTypeSwitch from '../components/MediaTypeSwitch';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/application';

HomeScreen.propTypes = {
	navigation: PropTypes.object
};

export default function HomeScreen() {

	const dispatch = useDispatch();

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
		dispatch(showSpinner);

		getTopRatedMedia();
		getPopularMedia();
		mediaType === 'movie' ? getUpcomingMovies() : getAiringTodaySeries();

	}, [mediaType]);

	useEffect(() => {
		if (topRatedMedia.length > 0 && popularMedia.length > 0 && (upcomingMovies.length > 0 || airingTodaySeries.length > 0)) {
			dispatch(hideSpinner);
		}

	}, [topRatedMedia, popularMedia, upcomingMovies, airingTodaySeries]);

	return (
		<>
			<Spinner></Spinner>
			<ScrollView style={BaseStyles.container}>
				<MediaTypeSwitch
					style={styles.mediaTypeSwitch}
					onClickMovie={() => onMediaTypeSelected('movie')}
					onClickSeries={() => onMediaTypeSelected('serie')}>
				</MediaTypeSwitch>

				<MediaCarousel
					mediaType={mediaType}
					style={styles.carousel}
					title="Mejor valoradas"
					items={topRatedMedia}
					buttonLabel="Ver más +"
					onPressLabel={() => navigation.push('MediaList', { mediaType: mediaType, mediaSearch: 'top' })} />

				<MediaCarousel
					mediaType={mediaType}
					style={styles.carousel}
					title="Según su popularidad"
					items={popularMedia}
					buttonLabel="Ver más +"
					width={130}
					height={250} 
					onPressLabel={() => navigation.push('MediaList', { mediaType: mediaType, mediaSearch: 'popular' })} />


				<View style={{ marginBottom: 40 }}>
					<MediaCarousel
						mediaType={mediaType}
						title={mediaType === 'movie' ? 'Proximamente' : 'Transmitiéndose hoy'}
						items={mediaType === 'movie' ? upcomingMovies : airingTodaySeries}
						buttonLabel="Ver más +"
						width={130}
						height={250} 
						onPressLabel={() => navigation.push('MediaList', { mediaType: mediaType, mediaSearch: 'next' })} />

				</View>
			</ScrollView>
		</>
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