import React from 'react';
import Spinner from '../components/Spinner';
import BaseStyles from '../BaseStyles';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ButtonWithIcon from '../components/ButtonWithIcon';
import plusIcon from '../../assets/plus.png';
import MyListsItem from '../components/MyListsItem';

export default function MyListsScreen() {
	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Mis listas</Text>
					<ButtonWithIcon text="Crear lista" icon={plusIcon} backgroundColor="#E6D72A" color="#000000"></ButtonWithIcon>
				</View>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <MyListsItem {...item} />}
					keyExtractor={item => item.id}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20
	},
	title: {
		color: '#FFFFFF',
		fontSize: 24,
	}
});

const DATA = [
	{
		id: 1,
		name: 'Lista general',
		itemCount: 20,
		isPublic: true
	},
	{
		id: 2,
		name: 'Peliculas de terror',
		itemCount: 10,
		isPublic: false
	},
	{
		id: 3,
		name: 'Series de accion',
		itemCount: 5,
		isPublic: true
	},
];