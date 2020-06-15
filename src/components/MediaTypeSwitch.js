import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

MediaTypeSwitch.propTypes = {
	defaultType: PropTypes.string,
	onClickMovie: PropTypes.func,
	onClickSeries: PropTypes.func
};

export default function MediaTypeSwitch(props) {
	const { onClickMovie = () => { }, onClickSeries = () => { }, style } = props;
	const [selectedType, setSelectedType] = useState('movie');

	const switchType = (mediaType) => {
		setSelectedType(mediaType);

		if (mediaType === 'movie') {
			onClickMovie();
		}
		else {
			onClickSeries();
		}
	}

	return (
		<View style={[styles.container, style]}>
			<TouchableWithoutFeedback
				onPress={() => { switchType('movie') }}>
				<View style={[selectedType === 'movie' ? styles.buttonActive : styles.buttonIdle, styles.buttonLeft]}>
					<Text style={styles.buttonLabel}>Películas</Text>
				</View>
			</TouchableWithoutFeedback >
			<TouchableWithoutFeedback
				onPress={() => { switchType('series') }}>
				<View style={[selectedType === 'series' ? styles.buttonActive : styles.buttonIdle, styles.buttonRight]}>
					<Text style={styles.buttonLabel} >Series</Text>
				</View>
			</TouchableWithoutFeedback>
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	buttonLeft: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10
	},
	buttonRight: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10
	},
	buttonIdle: {
		backgroundColor: '#344250',
		paddingHorizontal: 12,
		paddingVertical: 6,
		flex: 1,
	},
	buttonActive: {
		backgroundColor: '#60C7AC',
		paddingHorizontal: 12,
		paddingVertical: 6,
		flex: 1,
	},
	buttonLabel: {
		color: '#FFFFFF',
		fontSize: 16
	}
});