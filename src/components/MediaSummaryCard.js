import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Tag from './Tag';
import imagePlaceholder from '../../assets/image-placeholder.png'

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
				<Image source={imageUrl != null ? { uri: imageUrl } : imagePlaceholder} style={styles.image} />
				<View style={styles.cardContent}>
					<View style={styles.genres}>
						{genres.map((genre) => (
							<Tag
								key={genre}
								text={genre}
								fontSize={10}
								paddingHorizontal={6}
								paddingVertical={3}
								backgroundColor="#E6D53F"
								color="#34424F" />
						))}
					</View>
					<Text numberOfLines={2} style={styles.title}>{title}</Text>
					<Text style={styles.year}>{year}</Text>
					<Text numberOfLines={6} style={styles.summary}>{summary}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback >
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginVertical: 5,
		backgroundColor: '#344250'
	},
	image: {
		height: 215,
		width: 140
	},
	cardContent: {
		padding: 12,
		flex: 1
	},
	genres: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: "wrap"
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
		marginTop: 8,
		fontSize: 12,
		color: '#C1C5C9'
	}
});