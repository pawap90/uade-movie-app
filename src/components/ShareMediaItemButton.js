
import React from 'react';
import { StyleSheet, Image, Share } from 'react-native';
import PropTypes from 'prop-types';

import ShareIcon from '../../assets/share.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

ShareMediaItemButton.propTypes = {
	mediaType: PropTypes.string,
	title: PropTypes.string,
	url: PropTypes.string
};

export default function ShareMediaItemButton(props) {
	const { mediaType, title, url } = props;

	const onPress = async () => {
		const esType = mediaType === 'movie' ? 'película' : 'serie';
		let message = `Encontré esta ${esType} y creo que te puede interesar: ${title}.`;
		if (url)
			message += `\nConocela en: ${url}`;

		const shareOptions = {
			dialogTitle: `Compartir ${esType}`,
			title: `Te recomiendo ${title}!`,
			message: message
		};

		await Share.share(shareOptions);
	};

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Image style={styles.icon} source={ShareIcon}></Image>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	icon: {
		resizeMode: 'contain',
		tintColor: '#f5f5f5',
		width: 35,
		height: 35
	}
});