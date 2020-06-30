import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Image } from 'react-native';
import Tag from './Tag';
import TrashIcon from '../../assets/trash.png';
import ChangeIcon from '../../assets/change.png';
import imagePlaceholder from '../../assets/image-placeholder.png';
import ButtonWithIcon from './ButtonWithIcon';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

ListMediaItem.propTypes = {
	type: PropTypes.string,
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	imagePath: PropTypes.string,
	year: PropTypes.number,
	genres: PropTypes.array,
	onDeleteListItemTapped: PropTypes.func
};

export default function ListMediaItem(props) {

	const { type, id, title, description, imagePath, year, genres, onDeleteListItemTapped } = props;
	const navigation = useNavigation();

	const goToMediaDetails = () => {
		navigation.push('MediaDetails', {id: id, mediaType: type});
	};

	return (
		<View style={styles.container}>
			<View style={{flex: 1}}>
				<TouchableWithoutFeedback onPress={goToMediaDetails} style={{flexDirection: 'row'}}>
					<Image source={imagePath != null ? { uri: imagePath } : imagePlaceholder} style={styles.image} />
					<View style={styles.cardContent}>
						<View style={styles.header}>
							<View>
								<View style={styles.genres}>
									{genres.map((genre) => (
										<Tag
											key={genre}
											text={genre}
											fontSize={10}
											paddingHorizontal={6}
											paddingVertical={3}
											backgroundColor="#E6D53F"
											color="#34424F" />
									))}
								</View>
								<Text numberOfLines={2} style={styles.title}>{title}</Text>
							</View>
						</View>
						<Text style={styles.year}>{year}</Text>
						<Text numberOfLines={6} style={styles.description}>{description}</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.actionButtonsContainer}>
				<ButtonWithIcon
					icon={ChangeIcon}
					backgroundColor="#1F2D3D"
					paddingVertical={12}
					paddingHorizontal={16}
					marginBottom={10}
					onPress={() => onDeleteListItemTapped(id, title)}>
				</ButtonWithIcon>
				<ButtonWithIcon
					icon={TrashIcon}
					backgroundColor="#F18D9E"
					paddingVertical={12}
					paddingHorizontal={16}
					onPress={() => onDeleteListItemTapped(id, title)}>
				</ButtonWithIcon>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginVertical: 5,
		backgroundColor: '#344250'
	},
	image: {
		height: 'auto',
		width: 140,
	},
	cardContent: {
		padding: 12,
		flex: 1
	},
	genres: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	title: {
		fontSize: 18,
		color: '#FFFFFF'
	},
	year: {
		fontSize: 14,
		color: '#C1C5C9'
	},
	description: {
		marginTop: 8,
		fontSize: 12,
		color: '#C1C5C9'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	actionButtonsContainer: {
		display: 'flex',
		flexDirection: 'column',
		padding: 12
	}
});