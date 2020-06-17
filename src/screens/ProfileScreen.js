import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import PropTypes from 'prop-types';
import BaseStyles from '../BaseStyles';
import ic_avatar from '../../assets/ic_avatar.jpg';
import ic_key from '../../assets/ic_key.png';
import ProfileSectionWithAttribute from '../components/ProfileSectionWithAttribute';
import ProfileSection from '../components/ProfileSection';

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
				<ProfileSection  icon={ic_avatar} label="Datos personales"></ProfileSection>
				<ProfileSectionWithAttribute label="Nombre" text={PROFILE.user.name} onPress={() => alert('Change Name')}></ProfileSectionWithAttribute>
				<ProfileSectionWithAttribute label="Correo electronico" text={PROFILE.user.email} onPress={() => alert('Change Email')}></ProfileSectionWithAttribute>
				<View style = {styles.lineStyle} />
				<ProfileSection  icon={ic_key} label="Contraseña" onPress={() => alert('Change Password')}></ProfileSection>
				<View style = {styles.lineStyle} />
			</View>
			<View style={styles.footer}>
				<Button style={styles.button} title="CONFIRMAR" onPress={() => alert('Confirmar profile')}></Button>
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
		width: '100%',
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	},
	button: {
		width:'100%',
		fontSize: 14,
		fontWeight: "bold",
		color: "white",
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
		margin:10,
		alignSelf: 'stretch'
   }
});