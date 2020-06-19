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

	const [resultHeader, setResultHeader] = useState({ total: 0 });
	const [resultItems, setResultItems] = useState([]);
	const [page, setPage] = useState(1);
	const [endReached, setEndReached] = useState(false);

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
				<ProfileSection style={styles.profile} icon={ic_avatar} label="Datos personales"></ProfileSection>
				<ProfileSectionWithAttribute style={styles.profile} label="Nombre" text={PROFILE.user.name} onPress={() => alert('Change Name')}></ProfileSectionWithAttribute>
				<ProfileSectionWithAttribute style={styles.profile} label="Correo electronico" text={PROFILE.user.email} onPress={() => alert('Change Email')}></ProfileSectionWithAttribute>
				<View style = {styles.lineStyle} />
				<ProfileSection icon={ic_key} label="Contraseña" onPress={() => alert('Change Password')}></ProfileSection>
				<View style = {styles.lineStyle} />
				<ProfileGender label="Géneros preferidos" onPress={() => alert('Change Password')}></ProfileGender>
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
	title: {
		color: '#FFFFFF',
		fontSize: 24
	},
	totalResults: {
		color: '#FFFFFF',
		opacity: 0.7,
		fontSize: 18
	},
	list: {
		marginBottom: 20
	},
	footer: {
		bottom: 16,
		start: 16,
		end: 16,
		position: 'absolute',
	},
	lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
		marginTop:10,
		marginBottom:10,
		alignSelf: 'stretch'
   },
   profile: {
	   marginTop: 16,
   },
   button: {
		color: '#34424F',
		fontSize: 16,
		backgroundColor: '#E6D72A',
		paddingVertical: 6,
		borderRadius: 10,
		fontWeight: 'bold',
		textAlign: 'center'
   }
});