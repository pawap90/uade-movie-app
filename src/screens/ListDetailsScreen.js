import React, { useEffect, useState } from 'react';
import { showSpinner, hideSpinner } from '../actions/application';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageModal from '../components/MessageModal';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Spinner from '../components/Spinner';
import ListMediaItem from '../components/ListMediaItem';
import { useDispatch } from 'react-redux';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';

ListDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object
};

export default function ListDetailsScreen(props) {
	const { route } = props;
	const { id } = route.params;

	const dispatch = useDispatch();

	const [list, setList] = useState({});
	const [selectedItem, setSelectedItem] = useState({});
	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false);
	const [deleteResultModalData, setDeleteResultModalData] = useState({
		type: 'success',
		isVisible: false
	});

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

	const onDeleteListItemTapped = (id, name) => {
		setSelectedItem({
			id: id,
			name: name
		});
		setDeleteConfirmationModalIsVisible(true);
	};

	useEffect(() => {
		const getListDetail = () => {
			setList({
				id: id,
				name: 'Peliculas de terror',
				itemCount: 10,
				isPublic: false,
				items: [
					{
						id: 1,
						title: 'Jurassic Park',
						summary: 'Lorem ipsum dolor sit amet',
						imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1r8TWaAExHbFRzyqT3Vcbq1XZQb.jpg',
						year: 1993,
						genres: ['Accion', 'Aventura']
					},
					{
						id: 2,
						title: 'Jurassic Park',
						summary: 'Lorem ipsum dolor sit amet',
						imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1r8TWaAExHbFRzyqT3Vcbq1XZQb.jpg',
						year: 1993,
						genres: ['Accion', 'Aventura']
					},
					{
						id: 3,
						title: 'Jurassic Park',
						summary: 'Lorem ipsum dolor sit amet',
						imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1r8TWaAExHbFRzyqT3Vcbq1XZQb.jpg',
						year: 1993,
						genres: ['Accion', 'Aventura']
					},
				]
			});
		};
		getListDetail();
	}, []);

	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{list.name}</Text>
					<Text style={styles.itemCount}>{list.itemCount} elementos</Text>
				</View>
				<FlatList
					data={list.items}
					renderItem={({ item }) => <ListMediaItem {...item} onDeleteListItemTapped={onDeleteListItemTapped} />}
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
	title: {
		color: '#FFFFFF',
		fontSize: 24
	},
	itemCount: {
		color: '#FFFFFF',
		opacity: 0.7,
		fontSize: 18
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	}
});