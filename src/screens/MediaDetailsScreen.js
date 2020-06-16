import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import MovieHeader from '../components/MovieHeader';
import MovieDbService from '../services/MovieDbService';
import CommentsCarousel from '../components/CommentsCarousel';
import MediaCarousel from '../components/MediaCarousel';
import imagePlaceholder from '../../assets/image-placeholder.png';

MediaDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object
};

export default function MediaDetailsScreen(props) {

	const { route } = props;
	const { id, mediaType = 'movie' } = route.params;
	const [media, setMedia] = useState({});
	const [similarMedia, setSimilarMedia] = useState([]);

	useEffect(() => {
		const getMediaDetails = async () => {
			const result = mediaType === 'movie' ? await MovieDbService.getMovie(id) : await MovieDbService.getSerie(id);
			setMedia(result);
		};
		const getSimilarMedia = async () => {
			const results = mediaType === 'movie' ? await MovieDbService.getSimilarMovies(id) : await MovieDbService.getSimilarSeries(id);
			setSimilarMedia(results);
		};
		getMediaDetails();
		getSimilarMedia();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<Image style={styles.image} source={media.imagePath != null ? { uri: media.imagePath } : imagePlaceholder}></Image>
			<MovieHeader
				genres={media.genres}
				title={media.title}
				releaseDate={media.releaseDate}
				summary={media.summary}
				languages={media.languages}>
			</MovieHeader>
			<CommentsCarousel style={styles.carousel} />
			{similarMedia.length > 0 && <MediaCarousel mediaType={mediaType} style={styles.carousel} title={mediaType === 'movie' ? 'Peliculas similares' : 'Series similares'} items={similarMedia} width={125} height={200} />}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1F2D3D'
	},
	image: {
		width: '100%',
		height: 300
	},
	label: {
		color: '#FFFFFF'
	},
	carousel: {
		marginVertical: 12,
		paddingLeft: 24
	}
});