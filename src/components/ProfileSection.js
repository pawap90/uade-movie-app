
import React from 'react';
import { Text, StyleSheet, View, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

ProfileSection.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.number
};

export default function ProfileSection(props) {
	const { onPress, label, icon } = props;
	return (
		<View>
			<View >
				{icon && <Image style={styles.icon} source={icon}></Image>}
				<Text style={styles.text}>{label}</Text>
			</View>
			{ onPress && <View style={styles.right}>
				<Button title="Cambiar" onPress={onPress}></Button>
			</View> }
		</View>
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
		color: '#FFFFFF',
		textAlignVertical: 'top',
		marginLeft: 45
	},
	right: {
		alignItems: 'flex-end',
		textAlign: 'right',
		textAlignVertical: 'center'
	},
	icon: {
		width: 30,
		height: 30
	}
});