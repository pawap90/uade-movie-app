import React from 'react';
import { Image, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/search.png';

export default function SearchButton() {

	return (
		<Image style={styles.icon} source={SearchIcon}></Image>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
		tintColor: '#FFFFFF'
	}
});