
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import ProfileSection from './ProfileSection'

ProfileGender.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.number
};

export default function ProfileGender(props) {
	const { onPress, label } = props;
	return (
		<View style={styles.container} >
			<ProfileSection label={label} onPress={onPress}></ProfileSection>

		</View>
	);
}

const styles = StyleSheet.create({
	container : {
		height: 50,
        justifyContent: 'center',
	},
	text: {
		color: '#FFFFFF',
		start: 45,
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