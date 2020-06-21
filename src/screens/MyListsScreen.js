import React from 'react';
import Spinner from '../components/Spinner';
import BaseStyles from '../BaseStyles';
import { ScrollView } from 'react-native-gesture-handler';

export default function MyListsScreen() {
	return (
		<>
			<Spinner></Spinner>
			<ScrollView style={BaseStyles.container}>
			</ScrollView>
		</>
	);
}