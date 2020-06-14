import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image, Text } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieHeader from '../components/MovieHeader';
import MovieDbService from '../services/MovieDbService';

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
		const getMovieDetails = async () => {
			const result = await MovieDbService.getMovie(123)
			setMovie(result)
		}
		getMovieDetails()
	}, [])

	return (
		<ScrollView style={BaseStyles.container}>
			<Image style={styles.image} source={{ uri: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg" }}></Image>
			<MovieHeader
				genres={movie.genres} 
				title={movie.title}
				releaseDate={movie.releaseDate}
				summary={movie.summary}
				languages={movie.languages}>
			</MovieHeader>
			<Text style={{color: "#fff"}}>{JSON.stringify(movie)}</Text>
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