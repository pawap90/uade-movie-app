import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import BaseStyles from '../BaseStyles';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ButtonWithIcon from '../components/ButtonWithIcon';
import plusIcon from '../../assets/plus.png';
import ListsItem from '../components/ListsItem';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageModal from '../components/MessageModal';
import { useDispatch, connect } from 'react-redux';
import { showSpinner, hideSpinner, listsRefreshed } from '../actions/application';
import ListService from '../services/ListService';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


const ListsScreen = (props) => {

	const dispatch = useDispatch();
	const { applicationState } = props;

	const navigation = useNavigation();

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

	const onConfirmDeleteTapped = async () => {
		setDeleteConfirmationModalIsVisible(false);
		dispatch(showSpinner);

		try {
			await ListService.deleteListById(selectedItem.id)
			setDeleteResultModalData(prev => ({
				...prev,
				isVisible: true,
				title: `${selectedItem.name} ha sido eliminada`
			}));
			getMyLists()

		} catch (err) {
			if (err instanceof UserError) {
				setDeleteResultModalData(prev => ({
					...prev,
					isVisible: true,
					type: 'error',
					title: err.message
				}));
			}
		}
		setSelectedItem(null)
		dispatch(hideSpinner);

	};

	const onConfirmResultTapped = () => {
		setDeleteResultModalData(prev => ({ ...prev, isVisible: false }));
	};

	const getMyLists = async () => {
		dispatch(showSpinner);
		const lists = await ListService.getMyLists()
		setMyLists(lists);
		dispatch(hideSpinner);
	};

	useEffect(() => {
		getMyLists();
		dispatch(listsRefreshed)
	}, [applicationState.listsNeedsRefresh]);

	const onCreateTapped = () => {
		navigation.push('ListCreate');
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
						color="#1F2D3D"
						onPress={onCreateTapped}>
					</ButtonWithIcon>
				</View>
				<FlatList
					data={myLists}
					renderItem={({ item }) => <ListsItem {...item} onDeleteListTapped={onDeleteListTapped} />}
					keyExtractor={item => `${item.id}`}
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

ListsScreen.propTypes = {
	applicationState: {
		profileNeedsRefresh: PropTypes.object
	}
};

const mapStateToProps = (state) => {
	return {
		applicationState: {
			listsNeedsRefresh: state.listsNeedsRefresh
		}
	};
};

export default connect(mapStateToProps)(ListsScreen)


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