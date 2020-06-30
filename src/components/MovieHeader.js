import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Tag from '../components/Tag';
import Score from '../components/Score';
import DateHelper from '../helper/dateHelper';
import ButtonWithIcon from './ButtonWithIcon';
import plusIcon from '../../assets/plus.png';
import starIcon from '../../assets/star-full.png';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RateModal from './RateModal';
import MessageModal from './MessageModal';
import { showSpinner, hideSpinner, listsNeedsRefresh } from '../actions/application';
import ListService from '../services/ListService';

const MovieHeader = (props) => {

	const {
		title,
		releaseDate,
		summary,
		genres = [],
		languages = [],
		isLoggedIn,
		id,
		onUserRate,
		userAlreadyRate = false,
		mediaType,
		imagePath
	} = props;

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [showRateModal, setShowRateModal] = useState(false);
	const [showItemAddedToMyListsModal, setShowItemAddedToMyListsModal] = useState(false)

	const onAddToMyListsTapped = async () => {
		if (!isLoggedIn) {
			navigation.navigate('RequiredLogin', { message: 'Debe autenticarse en la app para poder agregar series o peliculas a sus listas' });
		}
		else {
			// TODO Handle add media to my lists
			dispatch(showSpinner)
			let myLists = await ListService.getMyLists()
			const defaultList = myLists.filter(l => l.isDefault)[0]
			await ListService.addItemToList(defaultList._id, {
				type: mediaType,
				id: id,
				title: title,
				description: summary,
				imagePath: imagePath,
				genres: genres,
				year: new Date(releaseDate).getFullYear()
			})
			setShowItemAddedToMyListsModal(true)
			dispatch(listsNeedsRefresh)
			dispatch(hideSpinner)
		}
	};

	const onRateTapped = () => {
		if (!isLoggedIn) {
			navigation.navigate('RequiredLogin', { message: 'Debe autenticarse en la app para poder calificar series o peliculas' });
		}
		else {
			setShowRateModal(true);
			// TODO Handle add media to my lists
		}
	};

	const onRateConfirmed = (score, comments) => {
		setShowRateModal(false);
		onUserRate(score, comments);
	};


	return (
		<>
			<View style={styles.container}>
				<View style={styles.genres}>
					{genres.map((genre) => (
						<Tag key={genre} text={genre} backgroundColor="#E6D53F" color="#34424F" />
					))}
				</View>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.releaseDate}>{DateHelper.format(releaseDate)}</Text>
				<Text numberOfLines={4} style={styles.summary}>{summary}</Text>
				<View style={styles.languages}>
					{languages.map((language) => (
						<Tag key={language} text={language} backgroundColor="#4C5B6A" color="#C1C5C9" />
					))}
				</View>
				<View style={styles.footer}>
					<Score value={3.4} total={3543}></Score>
					{!userAlreadyRate && <ButtonWithIcon text="Calificar" icon={starIcon} onPress={onRateTapped}></ButtonWithIcon>}
					<ButtonWithIcon text="Mi lista" icon={plusIcon} onPress={onAddToMyListsTapped}></ButtonWithIcon>
				</View>
			</View>
			<RateModal
				isVisible={showRateModal}
				onConfirm={onRateConfirmed}
				onCancel={() => setShowRateModal(false)}>
			</RateModal>
			<MessageModal
				isVisible={showItemAddedToMyListsModal}
				onConfirm={() => setShowItemAddedToMyListsModal(false)}
				title={`la ${mediaType == 'movie' ? 'pelicula' : 'serie'} '${title}' ha sido agregada a tu lista general`}>
			</MessageModal>
		</>
	);
};

MovieHeader.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.object,
	summary: PropTypes.string,
	genres: PropTypes.array,
	languages: PropTypes.array,
	isLoggedIn: PropTypes.bool,
	onUserRate: PropTypes.func,
	userAlreadyRate: PropTypes.bool
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34424F',
		padding: 24
	},
	genres: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	languages: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 4
	},
	title: {
		color: '#FFFFFF',
		fontSize: 24
	},
	releaseDate: {
		color: '#C1C5C9',
		marginBottom: 12
	},
	summary: {
		color: '#C1C5C9',
		marginBottom: 8
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	};
};

export default connect(mapStateToProps)(MovieHeader);