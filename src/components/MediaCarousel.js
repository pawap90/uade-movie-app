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

MediaCarousel.propTypes = {
	title: PropTypes.string,
	buttonLabel: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	navigation: PropTypes.object
};

export default function MediaCarousel(props) {
	const { title, buttonLabel, width = 175, height = 300, navigation } = props;
    
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.button}>{buttonLabel}</Text>
			</View>
			<SafeAreaView>
				<FlatList
					data={DATA}
					horizontal={true}
					renderItem={({ item }) => <MediaCarouselItem id={item.id} title={item.title} imageUrl={item.imageUrl} width={width} height={height} navigation={navigation} />}
					keyExtractor={item => item.id}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: Constants.statusBarHeight,
		paddingLeft: Constants.statusBarHeight,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 10
	},
	title: {
		color: '#FFFFFF',
		fontSize: 24,
	},
	button: {
		fontSize: 16,
		marginRight: Constants.statusBarHeight,
		backgroundColor: '#E6D72A',
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 10,
		fontWeight: 'bold'
	}
});