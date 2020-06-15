import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

MediaSummaryCard.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	genres: PropTypes.array,
	year: PropTypes.number,
	summary: PropTypes.string
};

export default function MediaSummaryCard(props) {
	const { id, title, imageUrl, genres, year, summary } = props;

	const navigation = useNavigation();

	const goToDetails = () => {
		navigation.push('MediaDetails', { id: id });
	};

	return (
		<TouchableWithoutFeedback
			key={id}
			onPress={goToDetails}>
			<View style={styles.container}>
				<Image source={imageUrl} style={styles.image} />
				<View>
					<View style={styles.genres}>
						{/* {genres.map((genre) => (
							<Tag key={genre} text={genre} backgroundColor="#E6D53F" textColor="#34424F" />
						))} */}
					</View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.year}>{year}</Text>
					<Text style={styles.summary}>{summary}</Text>
				</View>
			</View >
		</TouchableWithoutFeedback >
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	image: {
		height: 200
	},
	genres: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	title: {
		fontSize: 18,
		color: '#FFFFFF'
	},
	year: {
		fontSize: 14,
		color: '#C1C5C9'
	},
	summary: {
		fontSize: 12,
		color: '#C1C5C9'
	}
});