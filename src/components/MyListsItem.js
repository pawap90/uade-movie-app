import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import ListIcon from '../../assets/list.png';
import TrashIcon from '../../assets/trash.png';
import LockIcon from '../../assets/lock.png';
import ButtonWithIcon from './ButtonWithIcon';
import Tag from './Tag';
import PropTypes from 'prop-types';

MyListsItem.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	itemCount: PropTypes.number,
	isPublic: PropTypes.bool,
	onDeleteListTapped: PropTypes.func
};

export default function MyListsItem(props) {

	const { id, name, itemCount, isPublic, onDeleteListTapped } = props;

	return (
		<View style={styles.container}>
			<Image style={styles.icon} source={ListIcon} />
			<View style={styles.main}>
				<Text style={styles.name}>{name}</Text>
				<View style={styles.metadata}>
					<Tag
						text={`${itemCount} elementos`}
						backgroundColor="#E6D72A"
						paddingHorizontal={6}
						paddingVertical={3}>
					</Tag>
					{isPublic && <Image style={styles.isPrivateIcon} source={LockIcon}></Image>}
				</View>
			</View>

			<ButtonWithIcon
				icon={TrashIcon}
				backgroundColor="#F95F62"
				paddingVertical={12}
				paddingHorizontal={16}
				onPress={() => onDeleteListTapped(id, name)}>
			</ButtonWithIcon>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#4B5B6B',
		padding: 12,
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