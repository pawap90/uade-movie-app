import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ic_avatar from '../../assets/ic_avatar.jpg';
import ic_key from '../../assets/ic_key.png';
import ProfileSectionWithAttribute from '../components/ProfileSectionWithAttribute';
import ProfileSection from '../components/ProfileSection';
import ProfileGender from '../components/ProfileGender';

ProfileScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

const PROFILE = {
	user: {
		name: 'Jane Doe',
		email: 'janedoeiam@somemail.com',
		gender: ['Drama' , 'Ciencia Ficcion', 'Acción', 'Comedia']
	}
};

export default function ProfileScreen(props) {
	const { route } = props;
	const [resultItems, setResultItems] = useState([]);

	useEffect(() => {
		//searchProfile();
	});

	const searchProfile = async () => {
		let searchResult = {};
		
		//TODO Cambiar al servicio de nuestro backend o AssyncStorage
		// searchResult = await MovieDbService.searchSeries(page, searchTerm);

		setResultHeader(searchResult);
		setResultItems([...resultItems, ...searchResult.results]);
	};

	return (
		<View style={styles.container}>
			<View>
				<ProfileSection icon={ic_avatar} label="Datos personales"></ProfileSection>
				<ProfileSectionWithAttribute label="Nombre" text={PROFILE.user.name} onPress={() => alert('Change Name')}></ProfileSectionWithAttribute>
				<ProfileSectionWithAttribute label="Correo electronico" text={PROFILE.user.email} onPress={() => alert('Change Email')}></ProfileSectionWithAttribute>
				<View style = {styles.lineStyleTop} />
				<ProfileSection icon={ic_key} label="Contraseña" onPress={() => alert('Change Password')}></ProfileSection>
				<View style = {styles.lineStyleBottom} />
				<ProfileGender data={PROFILE.user.gender} label="Géneros preferidos" onPress={() => alert('Change Password')}></ProfileGender>
			</View>
			<View style={styles.footer}>
				<Text style={styles.button} onPress={() => alert('Confirmar profile')}>CONFIRMAR</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34424F',
		padding: 24,
		height: '100%'
	},
	footer: {
		bottom: 16,
		start: 16,
		end: 16,
		position: 'absolute',
	},
	lineStyleTop:{
        borderWidth: 0.5,
        borderColor:'#9099a4',
		alignSelf: 'stretch',
		marginTop: 32,
		marginBottom: 4
	},
	lineStyleBottom:{
        borderWidth: 0.5,
        borderColor:'#9099a4',
		alignSelf: 'stretch',
		marginBottom: 24,
		marginTop: 4
   	},
   	button: {
		color: '#34424F',
		fontSize: 16,
		backgroundColor: '#E6D72A',
		paddingVertical: 10,
		borderRadius: 10,
		fontWeight: 'bold',
		textAlign: 'center'
   	}
});