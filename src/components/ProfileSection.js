
import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';

ProfileSection.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.number,
	withLine: PropTypes.bool
};

export default function ProfileSection(props) {
	const { onPress, label, icon } = props;
	return (
		<View style={styles.container} >
			{ icon && <Image style={styles.icon} source={icon}></Image>}			
			<Text style={getStyleText({icon})}>
				{label}
			</Text>
			{ onPress && <View style={styles.right}>
				<Text style={styles.button} onPress={onPress}>Cambiar</Text>
			</View> }
		</View>
	);
}

function getStyleText(object) {
	if (object.icon > 0) {		
		return styles.textWithMargin
	} else {
		return styles.text
	}
}

const styles = StyleSheet.create({
	container : {
		height: 50,
		justifyContent: 'center',
	},
	textWithMargin: {
		color: '#FFFFFF',
		start: 45,
		fontWeight: 'bold',
		fontSize: 16,
	},
	text: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
	icon: {
		width: 30,
		height: 30,
		position: 'absolute',
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