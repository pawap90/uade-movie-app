import React, { useEffect, useState } from 'react';
import ProfileSection from '../components/ProfileSection';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, StyleSheet, View } from 'react-native';
import BaseStyles from '../BaseStyles';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { hideSpinner, showSpinner } from '../actions/application';
import AccountService from '../services/AccountService';
import AccountModel from '../models/AccountModel';

GenreSelectionScreen.propTypes = {
	route: PropTypes.object
};

export default function GenreSelectionScreen(props) {
	const { route } = props;
	const dispatch = useDispatch();
	const { userGenres } = route.params;
	const navigation = useNavigation();

	const [selectedGenres, setSelectedGenres] = useState(userGenres || [], []);
	const [allGenres, setAllGenres] = useState([]);


	useEffect(() => {

		const getGenres = async () => {
			dispatch(showSpinner);
			const genres = await MovieDbService.getAllGenres();
			setAllGenres(genres);
			const user = await AccountService.getCurrentUserData();
			setSelectedGenres(user.genres);
			dispatch(hideSpinner);
		};

		getGenres();
	}, []);

	const onItemTapped = (genre) => {
		if (isSelected(genre)) {
			const newArray = selectedGenres.filter(g => g !== genre);
			setSelectedGenres(newArray);
		}
		else {
			setSelectedGenres([...selectedGenres, genre]);
		}
	};

	const isSelected = (genre) => {
		return selectedGenres.indexOf(genre) != -1;
	};

	const getStylesBasedOnStatus = (genre) => {
		const baseStyles = styles.button;
		const dynamicStyles = isSelected(genre) ? styles.selected : styles.notSelected;

		return { ...baseStyles, ...dynamicStyles };
	};

	const onConfirm = async () => {
		dispatch(showSpinner);
		const updatedAccount = new AccountModel(null, null, null, selectedGenres);
		await AccountService.update(updatedAccount);
		dispatch(hideSpinner);
		navigation.pop();
	};

	return (
		<>
			<Spinner></Spinner>
			<View style={{ ...BaseStyles.container, justifyContent: 'space-between' }}>
				<ProfileSection title="Selecciona tus géneros favoritos"></ProfileSection>
				<ScrollView>
					{allGenres.map((genre, i) => (
						<View key={i} style={styles.buttonContainer}>
							<Text
								style={{ ...getStylesBasedOnStatus(genre) }}
								onPress={() => onItemTapped(genre)}>
								{genre}
							</Text>
						</View>
					))}
				</ScrollView>
				<ButtonWithIcon
					text="Confirmar"
					backgroundColor="#E6D72A"
					color="#000000"
					marginBottom={16}
					paddingVertical={12}
					onPress={onConfirm}>
				</ButtonWithIcon>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	button: {
		padding: 12,
		borderColor: '#60C7AC',
		borderWidth: 2,
		fontSize: 18,
		marginBottom: 16,
		borderRadius: 5
	},
	selected: {
		backgroundColor: '#60C7AC'
	},
	notSelected: {
		color: '#60C7AC',
		backgroundColor: 'transparent'
	}
});