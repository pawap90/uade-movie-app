import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import CommentsCarouselItem from './CommentsCarouselItem';

export default function CommentsCarousel(props) {
	const { style } = props;

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.title}>Comentarios</Text>
			<SafeAreaView>
				<FlatList
					data={DATA}
					horizontal={true}
					renderItem={({ item }) => <CommentsCarouselItem {...item} />}
					keyExtractor={item => item.id}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: '#FFFFFF',
		fontSize: 24,
		marginBottom: 12
	}
});

const DATA = [
	{
		id: '1',
		author: 'Kelly Blankenship',
		score: 4.1,
		comment: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit'
	},
	{
		id: '2',
		author: 'Tyla Scott',
		score: 4.6,
		comment: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
	},
	{
		id: '3',
		author: 'Jacque Barnard',
		score: 3.5,
		comment: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
	},
	{
		id: '4',
		author: 'Norma Edwards',
		score: 3,
		comment: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
	},
];