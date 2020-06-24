import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import BaseStyles from '../BaseStyles';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ButtonWithIcon from '../components/ButtonWithIcon';
import plusIcon from '../../assets/plus.png';
import ListsItem from '../components/ListsItem';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageModal from '../components/MessageModal';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/application';

export default function ListsScreen() {

	const dispatch = useDispatch();

	const [myLists, setMyLists] = useState([]);
	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	const [deleteResultModalData, setDeleteResultModalData] = useState({
		type: 'success',
		isVisible: false
	});

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
			setDeleteResultModalData(prev => ({
				...prev,
				isVisible: true,
				title: `${selectedItem.name} ha sido eliminada`
			}));
		}, 2000);
	};

	const onConfirmResultTapped = () => {
		setDeleteResultModalData(prev => ({ ...prev, isVisible: false }));
	};

	useEffect(() => {
		const getMyLists = () => {
			dispatch(showSpinner);
			// TODO - Load My lists from API
			setTimeout(() => {
				setMyLists(DATA);
				dispatch(hideSpinner);
			},1000);
		};
		getMyLists();
	}, []);

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
						color="#1F2D3D">
					</ButtonWithIcon>
				</View>
				<FlatList
					data={myLists}
					renderItem={({ item }) => <ListsItem {...item} onDeleteListTapped={onDeleteListTapped} />}
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
				type={deleteResultModalData.type}
				title={deleteResultModalData.title}
				animationType="fade"
				onConfirm={onConfirmResultTapped}
				isVisible={deleteResultModalData.isVisible}>
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