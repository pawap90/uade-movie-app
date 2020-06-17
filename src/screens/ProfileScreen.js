import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import MediaTypeSwitch from '../components/MediaTypeSwitch';
import BaseStyles from '../BaseStyles';
import { FlatList } from 'react-native-gesture-handler';
import MediaSummaryCard from '../components/MediaSummaryCard';

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
	const [mediaType, setMediaType] = useState(MEDIA_TYPE.movies.key);

	useEffect(() => {
		searchProfile();
	}, [page, mediaType]);

	const searchProfile = async () => {
		let searchResult = {};
		
		//TODO Cambiar al servicio de nuestro backend o AssyncStorage
		// searchResult = await MovieDbService.searchSeries(page, searchTerm);

		setResultHeader(searchResult);
		setResultItems([...resultItems, ...searchResult.results]);
	};

	return (
		<View style={BaseStyles.container}>
	
			<View style={styles.header}>
				<Text style={styles.title}>MovieApp</Text>
			</View>
			<View style={styles.container}>
				<View >
					{icon && <Image style={styles.icon} source={icon}></Image>}
					<Text style={styles.text}>Datos personales</Text>
				</View>
				<LabelEdit label="Nombre" text={PROFILE.name} onPress={() => alert('Change Name')}></LabelEdit>
				<LabelEdit label="Correo electronico" text={PROFILE.email} onPress={() => alert('Change Email')}></LabelEdit>
				<View style = {styles.lineStyle} />
				<InfoEdit label="Contraseña" onPress={() => alert('Change Password')}></InfoEdit>
				<View style = {styles.lineStyle} />
			</View>
			<View style={styles.footer}>
				<Button text="CONFIRMAR" onPress={() => alert('Confirmar profile')}></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34424F',
		padding: 24
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginVertical: 10
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
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	},
	lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
   }
});