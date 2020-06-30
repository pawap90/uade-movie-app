import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import MovieHeader from '../components/MovieHeader';
import MovieDbService from '../services/MovieDbService';
import CommentsCarousel from '../components/CommentsCarousel';
import MediaCarousel from '../components/MediaCarousel';
import MessageModal from '../components/MessageModal';
import imagePlaceholder from '../../assets/image-placeholder.png';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { hideSpinner, showSpinner } from '../actions/application';
import RateService from '../services/RateService';
import UserError from '../errors/UserError';
import RateModel from '../models/RateModel';
import ShareMediaItemButton from '../components/ShareMediaItemButton';

MediaDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object
};

export default function MediaDetailsScreen(props) {

	const { route } = props;
	const dispatch = useDispatch();
	const { id, mediaType = 'movie' } = route.params;
	const [media, setMedia] = useState({});
	const [similarMedia, setSimilarMedia] = useState([]);
	const [userAlreadyRate, setUserAlreadyRate] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [comments, setComments] = useState(null);
	const [similarMediaIsLoaded, setSimilarMediaIsLoaded] = useState(false);

	const getRatesWithComments = async () => {
		const results = await RateService.getMediaRates(mediaType, id);
		setUserAlreadyRate(results.map(c => c.ratedByMe).indexOf(true) != -1);
		setComments(results);
	};

	const onUserRate = async (score, comments) => {
		dispatch(showSpinner);
		try {
			await RateService.rateMedia(new RateModel(mediaType, id, `${score}`, comments));
			getRatesWithComments();
		}
		catch (error) {
			if (error instanceof UserError) {
				setErrorMessage(error.message);
			}
			else {
				setErrorMessage('Ha ocurrido un error inesperado al intentar calificar');
			}
		}
		dispatch(hideSpinner);
	};

	useEffect(() => {
		const getMediaDetails = async () => {
			const result = mediaType === 'movie' ? await MovieDbService.getMovie(id) : await MovieDbService.getSeries(id);
			setMedia(result);
		};
		const getSimilarMedia = async () => {
			const results = mediaType === 'movie' ? await MovieDbService.getSimilarMovies(id) : await MovieDbService.getSimilarSeries(id);
			setSimilarMediaIsLoaded(true);
			setSimilarMedia(results);
		};
		dispatch(showSpinner);
		getRatesWithComments();
		getMediaDetails();
		getSimilarMedia();
	}, []);

	useEffect(() => {
		if (similarMediaIsLoaded && media.id && comments != null) {
			dispatch(hideSpinner);
		}

	}, [media, similarMedia, comments]);

	return (
		<>
			<Spinner></Spinner>
			<ScrollView style={styles.container}>

				<ImageBackground style={styles.image} source={media.imageUrl != null ? { uri: media.imageUrl } : imagePlaceholder}>
					<ShareMediaItemButton mediaType={mediaType} title={media.title} url={media.url}></ShareMediaItemButton>

				</ImageBackground>
				<MovieHeader
					onUserRate={onUserRate}
					userAlreadyRate={userAlreadyRate}
					id={media.id}
					genres={media.genres}
					title={media.title}
					releaseDate={media.releaseDate}
					summary={media.summary}
					languages={media.languages}
					mediaType={mediaType}
					imagePath={media.imageUrl}
					voteAverage={media.score}
					voteCount={media.scoreCount}>
				</MovieHeader>
				{comments != null && comments.length > 0 && <CommentsCarousel comments={comments} style={styles.carousel} />}
				{
					similarMedia.length > 0 &&
					<MediaCarousel
						mediaType={mediaType}
						style={styles.carousel}
						title={mediaType === 'movie' ? 'Peliculas similares' : 'Series similares'}
						items={similarMedia}
						width={125}
						height={200}>
					</MediaCarousel>
				}
				<MessageModal
					isVisible={errorMessage != null}
					title={errorMessage}
					onConfirm={() => setErrorMessage(null)}>
				</MessageModal>

			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1F2D3D'
	},
	image: {
		width: '100%',
		height: 300,
		alignItems: 'flex-end',
		padding: 10
	},
	label: {
		color: '#FFFFFF'
	},
	carousel: {
		marginVertical: 12,
		paddingLeft: 24
	}
});