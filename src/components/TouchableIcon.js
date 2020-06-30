import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';

TouchableIcon.propTypes = {
	icon: PropTypes.number,
	onPress: PropTypes.func,
	grow: PropTypes.bool,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	paddingHorizontal: PropTypes.number,
	paddingVertical: PropTypes.number,
	marginHorizontal: PropTypes.number,
	marginBottom: PropTypes.number,
	iconSize: PropTypes.number,
};

export default function TouchableIcon(props) {
	const {
		icon,
		onPress,
		backgroundColor = 'transparent',
		color = '#FFFFFF',
		paddingHorizontal = 8,
		paddingVertical = 8,
		marginHorizontal = 0,
		marginBottom = 0,
		iconSize = 14
	} = props;

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={
				{
					...styles.container,
					backgroundColor: backgroundColor,
					paddingHorizontal: paddingHorizontal,
					paddingVertical: paddingVertical,
					marginHorizontal: marginHorizontal,
					marginBottom: marginBottom,
				}}>

				{icon && <Image style={
					{
						...styles.icon,
						tintColor: color,
						width: iconSize, height: iconSize
					}} source={icon}></Image>}

			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5
	},
	icon: {
		resizeMode: 'contain'
	}
});