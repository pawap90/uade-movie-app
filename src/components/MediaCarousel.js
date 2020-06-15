import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import MediaCarouselItem from './MediaCarouselItem';
import PropTypes from 'prop-types';

MediaCarousel.propTypes = {
	title: PropTypes.string,
	buttonLabel: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	items: PropTypes.arrayOf<PropTypes.object>[],
	mediaType: PropTypes.string
};

export default function MediaCarousel(props) {
	const { mediaType, title, buttonLabel, items, width = 175, height = 300 } = props;
    
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				{buttonLabel && <Text style={styles.button}>{buttonLabel}</Text>}
			</View>
			<SafeAreaView>
				<FlatList
					data={items}
					horizontal={true}
					renderItem={({ item }) => <MediaCarouselItem mediaType={mediaType} id={item.id} title={item.title} imageUrl={item.imagePath} width={width} height={height} />}
					keyExtractor={item => item.id}/>
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