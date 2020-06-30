import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import BaseStyles from '../BaseStyles';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import LoginBg from '../../assets/login-bg.jpg';
import Logo from '../../assets/logo.png';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Spinner from '../components/Spinner';
import AccountService from '../services/AccountService';
import LoginModel from '../models/LoginModel';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner, login } from '../actions/application';
import UserError from '../errors/UserError';
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

	const [form, setForm] = useState({
		email: null,
		password: null
	});

	const [errorMessage, setErrorMessage] = useState(null);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const onSubmitTapped = async () => {
		if (form.email === null || form.password === null) {
			setErrorMessage('Por favor completa los datos para poder ingresar');
			return;
		}


		dispatch(showSpinner);
		try {
			await AccountService.login(new LoginModel(form.email, form.password));
			dispatch(login);
			navigation.reset({
				routes: [{ name: 'TabBar' }]
			});
		}
		catch (error) {
			if (error instanceof UserError) {
				setErrorMessage(error.message);
			}
			else {
				setErrorMessage('Se produjo un error inesperado');
			}
		}
		dispatch(hideSpinner);
	};

	const onContinueAnonymousTapped = () => {
		navigation.reset({
			routes: [{ name: 'TabBar' }]
		});
	};

	const onRegisterTapped = () => {
		navigation.reset({
			routes: [{ name: 'Register' }]
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
			<ImageBackground source={LoginBg} style={styles.container}>
				<View style={styles.body}>
					<ScrollView>
						{/* Logo and App name */}
						<Image source={Logo} style={styles.logo}></Image>
						<Text style={styles.title}>MovieApp</Text>


						<View style={styles.form}>
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
								text="Continuar sin autenticarse"
								marginBottom={30}
								onPress={onContinueAnonymousTapped}>
							</ButtonWithIcon>
						</View>

						{/* Submit button */}
						<ButtonWithIcon
							text="INGRESAR"
							backgroundColor="#60C7AC"
							marginBottom={10}
							color="#000000"
							paddingVertical={12}
							onPress={onSubmitTapped}>
						</ButtonWithIcon>
						<ButtonWithIcon
							text="REGISTRARSE"
							backgroundColor="#344251"
							color="#FFFFFF"
							paddingVertical={12}
							onPress={onRegisterTapped}>
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