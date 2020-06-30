import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import CommentsCarouselItem from './CommentsCarouselItem';
import PropTypes from 'prop-types';

CommentsCarousel.propTypes = {
	style: PropTypes.object
};

export default function CommentsCarousel(props) {
	const { style, comments = [] } = props;

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.title}>Comentarios</Text>
			<SafeAreaView>
				<FlatList
					data={comments}
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