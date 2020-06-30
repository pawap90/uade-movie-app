import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import ListIcon from '../../assets/list.png';
import TrashIcon from '../../assets/trash.png';
import LockIcon from '../../assets/lock.png';
import ButtonWithIcon from './ButtonWithIcon';
import Tag from './Tag';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

ListsItem.propTypes = {
	_id: PropTypes.number,
	name: PropTypes.string,
	mediaItems: PropTypes.array,
	isPublic: PropTypes.bool,
	isDefault: PropTypes.bool,
	onDeleteListTapped: PropTypes.func
};

export default function ListsItem(props) {

	const navigation = useNavigation();

	const { _id, name, mediaItems = [], isPublic, isDefault, onDeleteListTapped } = props;

	const goToListDetails = () => {
		navigation.push('ListDetails', { id: _id });
	};

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, padding: 16 }}>
				<TouchableWithoutFeedback onPress={goToListDetails} style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image style={styles.icon} source={ListIcon} />
					<View style={styles.main}>
						<Text style={styles.name}>{name}</Text>
						<View style={styles.metadata}>
							<Tag
								text={`${mediaItems?.length} elementos`}
								backgroundColor="#E6D72A"
								paddingHorizontal={6}
								paddingVertical={3}>
							</Tag>
							{!isPublic && <Image style={styles.isPrivateIcon} source={LockIcon}></Image>}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>

			{!isDefault && <ButtonWithIcon
				icon={TrashIcon}
				backgroundColor="#F18D9E"
				paddingVertical={12}
				paddingHorizontal={16}
				marginHorizontal={16}
				onPress={() => onDeleteListTapped(id, name)}>
			</ButtonWithIcon>}
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#4B5B6B',
		marginBottom: 12,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		flex: 1
	},
	name: {
		color: '#FFFFFF',
		fontSize: 17,
		marginBottom: 5
	},
	icon: {
		width: 30,
		height: 30,
		tintColor: '#FFFFFF',
		marginRight: 16
	},
	isPrivateIcon: {
		width: 10,
		height: 10,
		tintColor: '#FFFFFF'
	},
	metadata: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});