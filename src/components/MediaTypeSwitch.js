import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import MediaCarouselItem from './MediaCarouselItem';
import PropTypes from 'prop-types';

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Jurassic Park',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Avengers: Endgame',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Game of Thrones',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SY1000_CR0,0,734,1000_AL_.jpg'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
		title: 'Avengers: Endgame',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d76',
		title: 'Game of Thrones',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SY1000_CR0,0,734,1000_AL_.jpg'
	}
];

MediaTypeSwitch.propTypes = {
	defaultType: PropTypes.string,
	onClickMovie: PropTypes.func,
	onClickSeries: PropTypes.func
};

export default function MediaTypeSwitch(props) {
	const { defaultType = 'movie', onClickMovie = () => { }, onClickSeries = () => { } } = props;

	let selectedType = defaultType;

	const onSwitch = (mediaType) => {
		selectedType = mediaType;

		if (selectedType === 'movie') {
			onClickMovie();
		}
		else {
			onClickSeries();
		}
	}

	return (
		<View style={styles.container}>
			<Button
				onPress={onSwitch('movie')}
				title="Películas"
				style={selectedType === 'movie' ? styles.buttonActive : styles.buttonIdle}
			/>
			<Button
				onPress={onSwitch('series')}
				title="Series"
				style={selectedType === 'series' ? styles.buttonActive : styles.buttonIdle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 10
	},
	buttonIdle: {
		color: '#FFFFFF',
		backgroundColor: '#344250',
		fontSize: 18,
	},
	buttonActive: {
		color: '#60C7AC',
		backgroundColor: '#344250',
		fontSize: 18,
	}
});