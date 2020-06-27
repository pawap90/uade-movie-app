import React, { useState } from 'react';
import ProfileSection from '../components/ProfileSection';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import BaseStyles from '../BaseStyles';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AccountService from '../services/AccountService';
import ChangePasswordModel from '../models/ChangePasswordModel';

ChangePasswordScreen.propTypes = {
	route: PropTypes.object
};

export default function ChangePasswordScreen(props) {
	const { route } = props;
	const navigation = useNavigation();
	const [valueCurrent, onChangeCurrentText] = React.useState('');
	const [valueNew, onChangeNewText] = React.useState('');
	const [valueRepeat, onChangeRepeatText] = React.useState('');


	const putChangePassword = async () => {
		let model = new ChangePasswordModel(valueCurrent, valueNew)
		const results = await AccountService.putChangePassword(model);
		setPopularMedia(results);
	};

	return (
		<View style={{ ...BaseStyles.container, justifyContent: 'space-between' }}>
			<ProfileSection title="Cambiar contraseña"></ProfileSection>
			<Text style={styles.label}>Contraseña actual</Text>
			<TextInput 
				style={styles.input}
				onChangeText={text => onChangeCurrentText(text)}
				value={valueCurrent}>
			</TextInput>
			<Text style={styles.label}>Nueva contraseña</Text>
			<TextInput 
				style={styles.input}
				onChangeText={text => onChangeNewText(text)}
				value={valueNew}>
			</TextInput>
			<Text style={styles.label}>Vuelve a escribir la contraseña</Text>
			<TextInput 
				style={styles.input}
				onChangeText={text => onChangeRepeatText(text)}
				value={valueRepeat}>
			</TextInput>
			<ButtonWithIcon
				text="Confirmar"
				backgroundColor="#E6D72A"
				color="#000000"
				marginBottom={16}
				paddingVertical={12}
				onPress={() => {
					if (valueNew === valueRepeat) {
						putChangePassword()
					}	
				}}>
			</ButtonWithIcon>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	button: {
		padding: 12,
		borderColor: '#60C7AC',
		borderWidth: 2,
		fontSize: 18,
		marginBottom: 16,
		borderRadius: 5
	},
	selected: {
		backgroundColor: '#60C7AC'
	},
	notSelected: {
		color: '#60C7AC',
		backgroundColor: 'transparent'
	},
	label: {
		color: '#ffffff'
	},
	input: {
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 1,
		color:'#ffffff',
	}
});