
import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import PropTypes from 'prop-types';

ProfileSectionWithAttribute.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string,
	text: PropTypes.string
};

export default function ProfileSectionWithAttribute(props) {
	const { onPress, text, label } = props;
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Text style={styles.text}>{label}</Text>
				<Text style={styles.text}>{text}</Text>
			</View>
			<View style={styles.right}>
				<Button title="Cambiar" onPress={onPress}></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop:16,
		backgroundColor: 'red'
	},
	text: {
		color: '#FFFFFF'
	},
	right: {
		alignItems: 'flex-end',
		textAlign: 'right'
	}
});