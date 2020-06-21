import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';

ButtonWithIcon.propTypes = {
	onPress: PropTypes.func,
	text: PropTypes.string,
	icon: PropTypes.number,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	paddingHorizontal: PropTypes.number,
	paddingVertical: PropTypes.number
};

export default function ButtonWithIcon(props) {
	const { onPress, text, icon, backgroundColor = 'transparent', color = '#FFFFFF', paddingHorizontal = 8, paddingVertical = 8 } = props;
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={
				{
					...styles.container,
					backgroundColor: backgroundColor,
					paddingHorizontal: paddingHorizontal,
					paddingVertical: paddingVertical
				}}>

				{icon && <Image style={
					{
						...styles.icon,
						tintColor: color,
						marginRight: text ? 8 : 0
					}} source={icon}></Image>}

				<Text style={{ color: color }}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
	},
	icon: {
		width: 14,
		height: 14,
	}
});