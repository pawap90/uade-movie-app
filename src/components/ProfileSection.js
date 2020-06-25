
import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import ButtonWithIcon from './ButtonWithIcon';

ProfileSection.propTypes = {
	onPress: PropTypes.func,
	title: PropTypes.string,
	icon: PropTypes.number,
	marginBottom: PropTypes.number
};

export default function ProfileSection(props) {
	const { onPress, title, icon, marginBottom = 0 } = props;
	return (
		<View style={{...styles.container, marginBottom}}>
			{icon && <Image style={styles.icon} source={icon}></Image>}

			<Text style={styles.title}>{title}</Text>

			{onPress && <View style={styles.right}>
				<ButtonWithIcon
					text="Cambiar"
					backgroundColor="#60C7AC"
					color="#000000">
				</ButtonWithIcon>
			</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10
	},
	title: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
	icon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
		tintColor: '#FFFFFF',
		marginRight: 15
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