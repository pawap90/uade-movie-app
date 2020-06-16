import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

Tag.propTypes = {
	text: PropTypes.string,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	paddingHorizontal: PropTypes.number,
	paddingVertical: PropTypes.number,
	fontSize: PropTypes.number,
};

export default function Tag(props) {
	const { text, backgroundColor, color, paddingHorizontal = 8, paddingVertical = 4, fontSize = 12 } = props;
	return (
		<Text style={{
			...styles.container,
			backgroundColor,
			color,
			paddingHorizontal,
			paddingVertical,
			fontSize
		}}>{text}</Text>
	);
}

const styles = StyleSheet.create({
	container: {
		marginRight: 8,
		marginBottom: 8,
		borderRadius: 10,
		fontWeight: 'bold'
	}
});