import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import BaseStyles from '../BaseStyles';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ButtonWithIcon from '../components/ButtonWithIcon';
import plusIcon from '../../assets/plus.png';
import MyListsItem from '../components/MyListsItem';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageModal from '../components/MessageModal';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/application';

export default function MyListsScreen() {

	const dispatch = useDispatch();

	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false);
	const [deleteResultModalIsVisible, setDeleteResultModalIsVisible] = useState(false);
	const [deleteResultType, setDeleteResultType] = useState('success');
	const [selectedItem, setSelectedItem] = useState({});

	const onDeleteListTapped = (id, name) => {
		setSelectedItem({
			id: id,
			name: name
		});
		setDeleteConfirmationModalIsVisible(true);
	};

	const onCancelDeleteTapped = () => {
		setDeleteConfirmationModalIsVisible(false);
	};

	const onConfirmDeleteTapped = () => {
		setDeleteConfirmationModalIsVisible(false);
		dispatch(showSpinner);
		
		// TO-DO Call API to delete list item
		setTimeout(() => {
			dispatch(hideSpinner);
			setDeleteResultModalIsVisible(true);
		},2000);
	};

	const onConfirmResultTapped = () => {
		setDeleteResultModalIsVisible(false);
	};

	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Mis listas</Text>
					<ButtonWithIcon
						text="Crear lista"
						icon={plusIcon}
						backgroundColor="#E6D72A"
						color="#000000">
					</ButtonWithIcon>
				</View>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <MyListsItem {...item} onDeleteListTapped={onDeleteListTapped} />}
					keyExtractor={item => item.id}
				/>
			</View>
			<ConfirmationModal
				animationType="fade"
				onCancel={onCancelDeleteTapped}
				onConfirm={onConfirmDeleteTapped}
				isVisible={deleteConfirmationModalIsVisible}
				title={`¿Está seguro que desea eliminar ${selectedItem.name}?`}>
			</ConfirmationModal>
			<MessageModal
				type={deleteResultType}
				animationType="fade"
				onConfirm={onConfirmResultTapped}
				isVisible={deleteResultModalIsVisible}
				title={`${selectedItem.name} ha sido eliminada`}>
			</MessageModal>
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