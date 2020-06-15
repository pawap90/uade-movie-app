import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieHeader from '../components/MovieHeader';
import MovieDbService from '../services/MovieDbService';
import CommentsCarousel from '../components/CommentsCarousel';
import MediaCarousel from '../components/MediaCarousel';

MediaDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object
};

export default function MediaDetailsScreen(props) {
	// Get Media item id from navigator
	
	const { route } = props;
	const { id } = route.params;
	const [mediaType, setMediaType] = useState("movie")
	const [movie, setMovie] = useState({});
	const [similarMedia, setSimilarMedia] = useState([]);

	useEffect(() => {
		const getMovieDetails = async () => {
			const result = await MovieDbService.getMovie(id);
			setMovie(result);
		};
		const getSimilarMedia = async () => {
			const results = mediaType === "movie" ? await MovieDbService.getSimilarMovies(id) : await MovieDbService.getSimilarSeries(id)
			setSimilarMedia(results)
		}
		getMovieDetails();
		getSimilarMedia();
	}, []);

	return (
		<ScrollView style={BaseStyles.container}>
			<Image style={styles.image} source={{ uri: movie.imagePath }}></Image>
			<MovieHeader
				genres={movie.genres} 
				title={movie.title}
				releaseDate={movie.releaseDate}
				summary={movie.summary}
				languages={movie.languages}>
			</MovieHeader>
			<CommentsCarousel/>
			<MediaCarousel title="Peliculas similares" items={similarMedia} width={125} height={200}/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 300
	},
	label: {
		color: '#FFFFFF'
	}
});