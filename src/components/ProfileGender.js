
import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import ProfileSection from './ProfileSection';

ProfileGender.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.number,
	data: PropTypes.array
};

export default function ProfileGender(props) {
	const { onPress, label, data } = props;
	return (
		<View style={styles.container} >
			<ProfileSection label={label} onPress={onPress}></ProfileSection>
			<FlatList data={data} renderItem={({ item }) =>
				<Text style={styles.itemList}>{item}</Text>
			}
			numColumns={3}>
			</FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	text: {
		color: '#FFFFFF',
		start: 45,
		fontWeight: 'bold',
		fontSize: 16,
	},
	icon: {
		width: 30,
		height: 30,
		position: 'absolute',
	},
	right: {
		position: 'absolute',
		end: 0,
	},
	button: {
		color: '#ffffff',
		fontSize: 12,
		backgroundColor: '#495969',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	itemList: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 12,
		width: 100,
		marginTop: 8,
		textAlign: 'center',
		marginStart: 8,
		justifyContent: 'center',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		paddingStart: 4,
	}
});