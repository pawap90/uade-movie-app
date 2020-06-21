
import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
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
		paddingHorizontal: 15,
		paddingVertical: 15.5,
		borderRadius: 10,
	},
	text: {
		color: '#343F4B',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	},
});