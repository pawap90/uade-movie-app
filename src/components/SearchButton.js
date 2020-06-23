import React from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchButton() {
	const navigation = useNavigation();

	return (
		<TouchableWithoutFeedback onPress={() => navigation.push('Search', { searchTerm: 'jurassic' })}>
			<Text style={{ paddingHorizontal: 10, color: '#FFFFFF' }}>Buscar</Text>
		</TouchableWithoutFeedback>
	);
}