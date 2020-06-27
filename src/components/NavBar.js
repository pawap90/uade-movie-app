import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ButtonWithIcon from './ButtonWithIcon';
import SearchButton from './SearchButton';
import BackIcon from '../../assets/back.png';
import { TextInput } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

NavBar.propTypes = {
	scene: PropTypes.object,
	previous: PropTypes.bool,
	navigation: PropTypes.object,
	includeSearch: PropTypes.bool
};

export default function NavBar(props) {
	const { scene, previous, navigation, includeSearch = false } = props;
	const { options } = scene.descriptor;
	const title = options.headerTitle || options.title || scene.route.name;


	const getSearchTermFromParams = (scene) => {
		if (scene && scene.route && scene.route.params && scene.route.params.searchTerm)
			return scene.route.params.searchTerm;
		return '';
	};

	const [value, onChangeText] = useState(getSearchTermFromParams(scene));

	const goToSearch = () => {
		const searchTerm = value;
		onChangeText('');
		if (scene.route.name === 'Search')
			navigation.replace('Search', { searchTerm: searchTerm });
		else
			navigation.push('Search', { searchTerm: searchTerm });
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>

				{/* Back button */}
				{previous && <ButtonWithIcon
					onPress={navigation.goBack}
					icon={BackIcon}
					color="#FFFFFF"
					iconSize={24}
					marginHorizontal={-8}>
				</ButtonWithIcon>}

				{/* Screen title */}
				<Text style={{...styles.title, marginLeft: previous ? 12 : 0}}>{title}</Text>
			</View>
			{includeSearch && <View style={styles.searchContainer}>

				{/* Search input */}
				<TextInput style={styles.searchBox}
					placeholder="Buscar..."
					placeholderTextColor="rgba(255,255,255,0.75)"
					value={value}
					onChangeText={onChangeText}
					onSubmitEditing={goToSearch}
					returnKeyType='search'
					onFocus={() => onChangeText('')}>
				</TextInput>
				<SearchButton></SearchButton>
			</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 35,
		paddingBottom: 10,
		paddingHorizontal: 16,
		backgroundColor: '#60C7AC'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 40
	},
	title: {
		flex: 1,
		fontSize: 18,
		color: '#FFFFFF'
	},
	searchBox: {
		flex: 1,
		color: '#FFFFFF'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 5,
		borderBottomColor: '#FFFFFF',
		borderBottomWidth: 1,
		alignItems: 'center',
	}
});