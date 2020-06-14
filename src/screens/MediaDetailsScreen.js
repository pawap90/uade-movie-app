import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, Image } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieHeader from '../components/MovieHeader';

MediaDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object
};

export default function MediaDetailsScreen(props) {
	// Get Media item id from navigator
	const { route } = props;
	const { id } = route.params;

	const [movie, setMovie] = useState({})

	useEffect(() => {
		const getMovieDetails = () => {
			return {
				genres: ['Drama', 'Acción'],
				title: 'Jurassic Park',
				releaseDate: '12/10/1990',
				description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
				imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg',
				languages: ['English', 'Spanish']
			}
		}
		setMovie(getMovieDetails())
	}, [])

	return (
		<ScrollView style={BaseStyles.container}>
			<Image style={styles.image} source={{ uri: movie.imageUrl }}></Image>
			<MovieHeader
				genres={movie.genres} 
				title={movie.title}
				releaseDate={movie.releaseDate}
				description={movie.description}
				languages={movie.languages}>
			</MovieHeader>
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