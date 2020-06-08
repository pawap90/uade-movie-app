import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	title: {
		fontSize: 15,
		backgroundColor: 'rgba(0,0,0,.5)',
		color: '#FFFFFF',
		padding: 12
	},
	image: {
		flex: 1,
		marginRight: 16,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	}
});

MediaCarouselItem.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	navigation: PropTypes.object
};

export default function MediaCarouselItem(props) {
	const { id, title, imageUrl, width, height, navigation } = props;

	const goToDetails = () => {
		navigation.push('MediaDetails', { id: id });
	};

	return (
		<TouchableWithoutFeedback onPress={goToDetails}>
			<ImageBackground style={{ ...styles.image, width: width, height: height }} source={{ uri: imageUrl }}>
				<Text style={styles.title}>{title}</Text>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
}