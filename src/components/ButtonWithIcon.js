import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';

ButtonWithIcon.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.number,
	onPress: PropTypes.func,
	isEnabled: PropTypes.bool,
	grow: PropTypes.bool,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	paddingHorizontal: PropTypes.number,
	paddingVertical: PropTypes.number,
	fontSize: PropTypes.number,
	marginHorizontal: PropTypes.number,
	marginVertical: PropTypes.number,
	marginBottom: PropTypes.number,
	iconSize: PropTypes.number,
};

export default function ButtonWithIcon(props) {
	const {
		text,
		icon,
		onPress,
		isEnabled = true,
		grow = false,
		backgroundColor = 'transparent',
		color = '#FFFFFF',
		paddingHorizontal = 8,
		paddingVertical = 8,
		fontSize = 14,
		marginHorizontal = 0,
		marginBottom = 0,
		iconSize = 14
	} = props;

	return (
		<TouchableWithoutFeedback disabled={!isEnabled} onPress={onPress}>
			<View style={
				{
					...styles.container,
					backgroundColor: backgroundColor,
					paddingHorizontal: paddingHorizontal,
					paddingVertical: paddingVertical,
					marginHorizontal: marginHorizontal,
					marginBottom: marginBottom,
					flex: grow ? 1 : 0
				}}>

				{icon && <Image style={
					{
						...styles.icon,
						tintColor: color,
						marginRight: text ? 8 : 0,
						width: iconSize, height: iconSize
					}} source={icon}></Image>}

				<Text style={{ color: color, fontSize: fontSize, fontWeight: 'bold' }}>{text}</Text>
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