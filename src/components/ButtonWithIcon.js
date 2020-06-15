
import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';

ButtonWithIcon.propTypes = {
	onPress: PropTypes.func,
	text: PropTypes.string,
	icon: PropTypes.number
};

export default function ButtonWithIcon(props) {

	const { onPress, text, icon } = props;
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				{icon && <Image style={styles.icon} source={icon}></Image>}
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
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
	icon: {
		tintColor: '#FFFFFF',
		marginRight: 8,
		width: 14,
		height: 14
	}
});