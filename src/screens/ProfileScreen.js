import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import UserIcon from '../../assets/user.png';
import KeyIcon from '../../assets/key.png';
import ProfileAttribute from '../components/ProfileAttribute';
import ProfileSection from '../components/ProfileSection';
import ProfileGenres from '../components/ProfileGenres';
import BaseStyles from '../BaseStyles';
import Separator from '../components/Separator';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';

ProfileScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default function ProfileScreen() {
	const navigation = useNavigation();
	const [user, setUser] = useState({});

	const getUser = () => {
		setUser({
			name: 'Jane Doe',
			email: 'janedoeiam@somemail.com',
			genres: ['Drama', 'Ciencia Ficcion']
		});
	};

	const onAttributeChange = (attribute, newValue) => {
		setUser({
			...user,
			[attribute]: newValue
		});
	};

	const onSubmit = () => {
		// TODO CALL API TO SAVE user
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<View style={BaseStyles.container}>

			<ScrollView>
				<ProfileSection
					icon={UserIcon}
					title="Datos personales"
					marginBottom={12}>
				</ProfileSection>

				<ProfileAttribute
					label="Nombre"
					name="name"
					value={user.name}
					buttonText="Cambiar"
					updateProfile={onAttributeChange}>
				</ProfileAttribute>

				<ProfileAttribute
					label="Correo electronico"
					name="email"
					value={user.email}
					buttonText="Cambiar"
					updateProfile={onAttributeChange}>
				</ProfileAttribute>

				<Separator />

				<ProfileSection
					icon={KeyIcon}
					title="Contraseña"
					onPress={() => alert('Change Password')}>
				</ProfileSection>

				<Separator />

				<ProfileSection
					title="Géneros preferidos"
					onPress={() => navigation.push('GenreSelection', { userGenres: user.genres })}
					marginBottom={12}>
				</ProfileSection>

				<ProfileGenres genres={user.genres}></ProfileGenres>

			</ScrollView>

			<ButtonWithIcon
				backgroundColor="#E6D72A"
				text="Confirmar"
				color="#000000"
				marginBottom={16}
				paddingVertical={12}
				onPress={onSubmit} />
		</View>
	);
}