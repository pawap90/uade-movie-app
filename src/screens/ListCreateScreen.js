import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import BaseStyles from '../BaseStyles';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Spinner from '../components/Spinner';
import ListModel from '../models/ListModel';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner, listsNeedsRefresh } from '../actions/application';
import UserError from '../errors/UserError';
import MessageModal from '../components/MessageModal';
import { useNavigation } from '@react-navigation/native';
import ListService from '../services/ListService';

export default function ListCreateScreen() {

	const [form, setForm] = useState({
		name: '',
		isPublic: false
	});

	const [errorMessage, setErrorMessage] = useState(null);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const onSubmitTapped = async () => {
		if (!form.name || form.name.length === 0) {
			setErrorMessage('Por favor completa los datos para poder ingresar');
			return;
		}

		dispatch(showSpinner);
		try {
			await ListService.create(new ListModel(false, form.name, form.isPublic, null, null));
			dispatch(listsNeedsRefresh)
			navigation.goBack();
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

	const onAttributeChange = (attribute, newValue) => {
		setForm({
			...form,
			[attribute]: newValue
		});
	};

	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Nueva Lista</Text>
				</View>
				<ScrollView>

					<View style={styles.form}>
						{/* Name label and input */}
						<Text style={BaseStyles.label}>Nombre</Text>
						<TextInput
							value={form.name}
							style={{ ...BaseStyles.input }}
							textContentType='none'
							onChangeText={(text) => onAttributeChange('name', text)}
						/>

						<Text style={BaseStyles.label}>Es pública?</Text>
						<Switch
							onValueChange={() => onAttributeChange('isPublic', !form.isPublic)}
							style={styles.switch}
							value={form.isPublic}
						/>
					</View>

					{/* Submit button */}
					<ButtonWithIcon
						text="CREAR"
						backgroundColor="#E6D72A"
						marginBottom={10}
						color="#000000"
						paddingVertical={12}
						onPress={onSubmitTapped}>
					</ButtonWithIcon>
				</ScrollView>
			</View>
			<MessageModal
				title={errorMessage}
				isVisible={errorMessage != null}
				onConfirm={() => setErrorMessage(null)}
			></MessageModal>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 20
	},
	body: {
		width: '80%',
		backgroundColor: '#1F2D3D',
		padding: 32,
		borderRadius: 10
	},
	switch: {
		marginBottom: 15,
		alignSelf: 'flex-start'
	},
	title: {
		color: '#60C7AC',
		fontSize: 32,
		textAlign: 'center',
		marginBottom: 15,
		marginTop: 25
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