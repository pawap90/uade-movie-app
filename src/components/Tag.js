import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

Tag.propTypes = {
	text: PropTypes.string,
	backgroundColor: PropTypes.string,
	borderColor: PropTypes.string,
	color: PropTypes.string,
	paddingHorizontal: PropTypes.number,
	paddingVertical: PropTypes.number,
	fontSize: PropTypes.number,
	marginBottom: PropTypes.number
};

export default function Tag(props) {
	const { 
		text, 
		backgroundColor, 
		borderColor, 
		color, 
		paddingHorizontal = 8, 
		paddingVertical = 4, 
		fontSize = 12,
		marginBottom = 8
	} = props;

	return (
		<Text style={{
			...styles.container,
			backgroundColor,
			borderColor,
			borderWidth: borderColor ? 1 : 0,
			color,
			paddingHorizontal,
			paddingVertical,
			fontSize,
			marginBottom
		}}>{text}</Text>
	);
}

const styles = StyleSheet.create({
	container: {
		marginRight: 8,
		borderRadius: 5,
		fontWeight: 'bold'
	}
});