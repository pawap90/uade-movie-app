
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import ButtonWithIcon from './ButtonWithIcon';

ProfileAttribute.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	buttonText: PropTypes.string,
	onButtonClick: PropTypes.func,
};

export default function ProfileAttribute(props) {
	const { label, value, buttonText, onButtonClick } = props;
	return (
		<View style={styles.container}>
			<View style={styles.attribute}>
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.value}>{value}</Text>
			</View>
			<ButtonWithIcon
				text={buttonText}
				backgroundColor="#60C7AC"
				color="#000000"
				onPress={onButtonClick}>
			</ButtonWithIcon>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		color: '#9099a4',
		fontSize: 16
	},
	value: {
		color: '#FFFFFF',
		fontSize: 16
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16
	}
});