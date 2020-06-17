
import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

LabelEdit.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string,
	text: PropTypes.string
};

export default function ButtonWithIcon(props) {
	const { onPress, text, label } = props;
	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.text}>{label}</Text>
				<Text style={styles.text}>{text}</Text>
			</View>
			<View style={styles.right}>
				<Button text="Cambiar" onPress={onPress}></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 6
	},
	text: {
		color: '#FFFFFF'
	},
	right: {
		alignItems: 'flex-end',
		textAlign: 'right'
	}
});