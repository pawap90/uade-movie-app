import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BaseStyles from '../BaseStyles';
import Spinner from '../components/Spinner';
import { Picker } from 'react-native';
import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner, listsNeedsRefresh } from '../actions/application';
import ListService from '../services/ListService';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

MoveMediaItemScreen.propTypes = {
	route: PropTypes.object
};

export default function MoveMediaItemScreen(props) {
	const { route } = props;
	const { sourceListId, title, mediaType, mediaId, description, imagePath, year, genres } = route.params;
	const dispatch = useDispatch();
	const [destinationList, setDestinationList] = useState({});
	const [lists, setLists] = useState([]);
	const navigation = useNavigation();

	const getMyLists = async () => {
		dispatch(showSpinner);
		const results = await ListService.getMyLists();
		setLists(results);
		dispatch(hideSpinner);
	};

	const onListSelected = (itemValue) => {
		setDestinationList(itemValue);
	};

	const onSubmitTapped = async () => {
		dispatch(showSpinner);
		try {
			await ListService.deleteListItem(sourceListId, mediaType, mediaId);
			await ListService.addItemToList(destinationList, {
				type: mediaType,
				id: mediaId,
				title: title,
				description: description,
				imagePath: imagePath,
				genres: genres,
				year: year
			});
		}
		catch (err) {
			alert(JSON.stringify(err));
		}
		dispatch(listsNeedsRefresh);
		dispatch(hideSpinner);
		navigation.goBack();
	};

	useEffect(() => {
		getMyLists();
	}, []);

	return (
		<>
			<Spinner></Spinner>
			<View style={BaseStyles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{`Mover '${title}' a otra lista`}</Text>
				</View>
				<Picker
					style={styles.picker}
					selectedValue={destinationList}
					onValueChange={onListSelected}>
					{lists.map(list => (
						<Picker.Item key={list._id} label={list.name} value={list._id} />
					))}
				</Picker>
				<View style={{flex: 1}}></View>

				{/* Submit button */}
				<ButtonWithIcon
					text="MOVER"
					backgroundColor="#E6D72A"
					marginBottom={10}
					color="#000000"
					paddingVertical={12}
					onPress={onSubmitTapped}>
				</ButtonWithIcon>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 20
	},
	title: {
		color: '#60C7AC',
		fontSize: 32,
		textAlign: 'center',
		marginBottom: 15,
		marginTop: 25
	},
	picker: {
		backgroundColor: '#344251',
		color: '#FFFFFF'
	}
});