import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Score from './Score';
import PropTypes from 'prop-types';

CommentsCarouselItem.propTypes = {
	id: PropTypes.string,
	author: PropTypes.string,
	score: PropTypes.number,
	comment: PropTypes.string
};

export default function CommentsCarouselItem(props) {
	const { id, author, score, comment } = props;
	return (
		<View key={id} style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.author}>{author}</Text>
				<Score value={score} showTitle={false} starSize={15} />
			</View>
			<Text numberOfLines={4} style={styles.comment}>{comment}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#4C5B6A',
		borderRadius: 12,
		padding: 14,
		width: 300,
		marginRight: 12
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 8
	},
	author: {
		color: '#C1C5C9'
	},
	comment: {
		color: '#FFFFFF'
	}
});