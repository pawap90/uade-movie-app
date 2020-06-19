
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
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
				<Text style={styles.textLabel}>{label}</Text>
				<Text style={styles.text}>{text}</Text>
			</View>
			<View style={styles.right}>
				<Text style={styles.button} onPress={onPress}>Cambiar</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	textLabel: {
		color: '#9099a4',
		fontSize: 16
	},
	text: {
		color: '#FFFFFF',
		fontSize: 16
	},
	icon: {
		width: 30,
		height: 30,
		position: 'absolute',
	},
	container : {
		height: 50,
        justifyContent: 'center',
	},
	right: {
		position: 'absolute',
		end: 0,
	},
	button: {
		color: '#ffffff',
		fontSize: 12,
		backgroundColor: '#495969',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 10,
		fontWeight: 'bold',
		textAlign: 'center'
   }
});