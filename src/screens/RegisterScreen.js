import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import BaseStyles from '../BaseStyles';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import BackgroundImage from '../../assets/login-bg.jpg';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Spinner from '../components/Spinner';
import AccountService from '../services/AccountService';
import RegisterModel from '../models/RegisterModel';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner, login } from '../actions/application';
import UserError from '../errors/UserError';
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {

	const [form, setForm] = useState({
		email: '',
		password: '',
		name: '',
		lastname: ''
	});

	const [errorMessage, setErrorMessage] = useState(null);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const onSubmitTapped = async () => {
		if (!form.email || !form.password || !form.name || !form.lastname) {
			setErrorMessage('Por favor completa los datos para poder ingresar');
			return;
		}

		dispatch(showSpinner);
		try {
			await AccountService.register(new RegisterModel(form.email, form.name, form.lastname, form.password));
			dispatch(login);
			navigation.reset({
				routes: [{ name: 'TabBar' }]
			});
		}
		catch (error) {
			if (error instanceof UserError) {
				setErrorMessage(error.message);
			}
		}
		dispatch(hideSpinner);
	};

	const onContinueLoginTapped = () => {
		navigation.reset({
			routes: [{ name: 'Login' }]
		});
	};

	const onAttributeChange = (attribute, newValue) => {
		setForm({
			...form,
			[attribute]: newValue
		});
	};

	return (
		<View style={{ flex: 1 }}>
			<Spinner></Spinner>
			<ImageBackground source={BackgroundImage} style={styles.container}>
				<View style={styles.body}>
					<ScrollView>
						<Text style={styles.title}>MovieApp</Text>

						<View style={styles.form}>

							{/* Name label and input */}
							<Text style={BaseStyles.label}>Nombre</Text>
							<TextInput
								value={form.name}
								style={{ ...BaseStyles.input }}
								textContentType='name'
								onChangeText={(text) => onAttributeChange('name', text)}
							/>

							{/* Lastname label and input */}
							<Text style={BaseStyles.label}>Apellido</Text>
							<TextInput
								value={form.lastname}
								style={{ ...BaseStyles.input }}
								textContentType='familyName'
								onChangeText={(text) => onAttributeChange('lastname', text)}
							/>

							{/* Email label and input */}
							<Text style={BaseStyles.label}>Correo electrónico</Text>
							<TextInput
								value={form.email}
								style={{ ...BaseStyles.input }}
								textContentType='emailAddress'
								onChangeText={(text) => onAttributeChange('email', text)}
							/>

							{/* Password label and input */}
							<Text style={BaseStyles.label}>Contraseña</Text>
							<TextInput
								value={form.password}
								style={{ ...BaseStyles.input, marginBottom: 20 }}
								secureTextEntry={true}
								textContentType='password'
								onChangeText={(text) => onAttributeChange('password', text)}
							/>
							<ButtonWithIcon
								text="Ya tengo cuenta, ingresar"
								marginBottom={30}
								onPress={onContinueLoginTapped}>
							</ButtonWithIcon>
						</View>

						{/* Submit button */}
						<ButtonWithIcon
							text="REGISTRARME"
							backgroundColor="#60C7AC"
							marginBottom={10}
							color="#000000"
							paddingVertical={12}
							onPress={onSubmitTapped}>
						</ButtonWithIcon>
					</ScrollView>
				</View>
			</ImageBackground>
			<MessageModal
				title={errorMessage}
				isVisible={errorMessage != null}
				onConfirm={() => setErrorMessage(null)}
			></MessageModal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	body: {
		width: '80%',
		backgroundColor: '#1F2D3D',
		padding: 32,
		borderRadius: 10
	},
	title: {
		color: '#60C7AC',
		fontSize: 32,
		textAlign: 'center',
		marginBottom: 15
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginBottom: 5
	},
	form: {
		flex: 1
	}
});