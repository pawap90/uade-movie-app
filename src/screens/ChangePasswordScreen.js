import React, { useState } from 'react';
import ProfileSection from '../components/ProfileSection';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import BaseStyles from '../BaseStyles';
import ButtonWithIcon from '../components/ButtonWithIcon';
import PropTypes from 'prop-types';
import AccountService from '../services/AccountService';
import ChangePasswordModel from '../models/ChangePasswordModel';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/application';
import MessageModal from '../components/MessageModal';

ChangePasswordScreen.propTypes = {
	route: PropTypes.object
};

export default function ChangePasswordScreen() {
	const [errorMessage, setErrorMessage] = useState(null);
	const [valueCurrent, onChangeCurrentText] = React.useState('');
	const [valueNew, onChangeNewText] = React.useState('');
	const [valueRepeat, onChangeRepeatText] = React.useState('');

	const dispatch = useDispatch();

	const onSubmitTapped = async () => {
		if(valueNew.length === 0 || valueRepeat.length === 0 || valueCurrent.length === 0) {
			setErrorMessage('Por favor completa los datos para poder ingresar');
			return;
		}
		if (valueNew !== valueRepeat) {
			setErrorMessage('Las contraseñas no coinciden');
			return;
		}

		dispatch(showSpinner);
		try {
			await AccountService.changePassword(new ChangePasswordModel(valueCurrent, valueNew));
			setErrorMessage('Contraseña cambiada con exito');
		}
		catch (error) {
			setErrorMessage(error.message);
		}
		dispatch(hideSpinner);
	};

	return (
		<View style={{ ...BaseStyles.container}}>
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
				style={styles.button}
				text="Confirmar"
				backgroundColor="#E6D72A"
				color="#000000"
				marginBottom={16}
				paddingVertical={12}
				onPress={() => onSubmitTapped() }>
			</ButtonWithIcon>
			<MessageModal
				title={errorMessage}
				isVisible={errorMessage != null}
				onConfirm={() => setErrorMessage(null)}></MessageModal>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		bottom: 0
	},
	label: {
		color: '#ffffff',
		marginTop: 16
	},
	input: {
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 1,
		color:'#ffffff',
	}
});