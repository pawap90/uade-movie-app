
import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';

ButtonWithoutIcon.propTypes = {
	onPress: PropTypes.func,
	text: PropTypes.string,
};

export default function ButtonWithoutIcon(props) {

	const { onPress, text } = props;
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		padding: 6,
		backgroundColor: '#E6D72A',
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 10,
	},
	text: {
		color: '#343F4B',
		fontWeight: 'bold',
		fontSize: 16,
		
	},
});

button: {

}