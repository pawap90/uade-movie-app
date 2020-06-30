import React, {  useState, useEffect } from 'react';
import { showSpinner, hideSpinner, listsNeedsRefresh, listsRefreshed } from '../actions/application';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageModal from '../components/MessageModal';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Spinner from '../components/Spinner';
import ListMediaItem from '../components/ListMediaItem';
import { useDispatch, connect } from 'react-redux';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import ListService from '../services/ListService';
import UserError from '../errors/UserError';

const ListDetailsScreen = (props) => {
	const { route, applicationState } = props;
	const { id } = route.params;

	const dispatch = useDispatch();

	const [selectedItem, setSelectedItem] = useState({});
	const [list, setList] = useState({});
	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false);
	const [deleteResultModalData, setDeleteResultModalData] = useState({
		type: 'success',
		isVisible: false
	});

	const onCancelDeleteTapped = () => {
		setDeleteConfirmationModalIsVisible(false);
	};

	const onConfirmDeleteTapped = async () => {
		setDeleteConfirmationModalIsVisible(false);
		dispatch(showSpinner);
		try {
			await ListService.deleteListItem(id, selectedItem.mediaType, selectedItem.id);
			setDeleteResultModalData(prev => ({
				...prev,
				isVisible: true,
				title: `${selectedItem.title} ha sido eliminada`
			}));
		}
		catch (err) {
			if (err instanceof UserError) {
				setDeleteResultModalData(prev => ({
					...prev,
					isVisible: true,
					type: 'error',
					title: err.message
				}));
			}
		}
		dispatch(hideSpinner);

	};

	const onConfirmResultTapped = () => {
		setSelectedItem(false);
		setDeleteResultModalData(prev => ({ ...prev, isVisible: false }));
		getListById();
		dispatch(listsNeedsRefresh);
	};

	const getListById = async () => {
		const result = await ListService.getListById(id);
		setList(result);
	};

	const onDeleteListItemTapped = (mediaType, mediaId, title) => {
		setSelectedItem({
			id: mediaId,
			title: title,
			mediaType: mediaType
		});
		setDeleteConfirmationModalIsVisible(true);
	};

	useEffect(() => {
		getListById();
		dispatch(listsRefreshed);
	}, [applicationState.listsNeedsRefresh]);

	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{list.name}</Text>
					{list.mediaItems != null && <Text style={styles.itemCount}>{list.mediaItems.length} elementos</Text>}
				</View>
				<FlatList
					data={list.mediaItems}
					renderItem={({ item }) => <ListMediaItem {...item} listId={id} onDeleteListItemTapped={() => onDeleteListItemTapped(item.type, item.id, item.title)} />}
					keyExtractor={item => item.id}
				/>
			</View>
			<ConfirmationModal
				animationType="fade"
				onCancel={onCancelDeleteTapped}
				onConfirm={onConfirmDeleteTapped}
				isVisible={deleteConfirmationModalIsVisible}
				title={`¿Está seguro que desea eliminar ${selectedItem.title}?`}>
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
};

ListDetailsScreen.propTypes = {
	route: PropTypes.object,
	params: PropTypes.object,
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

export default connect(mapStateToProps)(ListDetailsScreen);

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