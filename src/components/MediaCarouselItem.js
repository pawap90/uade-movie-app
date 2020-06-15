import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import imagePlaceholder from '../../assets/image-placeholder.png';

MediaCarouselItem.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number
};

export default function MediaCarouselItem(props) {
	const { id, title, imageUrl, width, height } = props;

	const navigation = useNavigation();

	const goToDetails = () => {
		navigation.push('MediaDetails', { id: id });
	};

	return (
		<TouchableWithoutFeedback key={id} onPress={goToDetails}>
			<ImageBackground style={{ ...styles.image, width: width, height: height }} source={imageUrl != null ? { uri: imageUrl } : imagePlaceholder}>
				<Text style={styles.title}>{title}</Text>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
}

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