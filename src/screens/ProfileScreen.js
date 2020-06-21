import React from 'react';
import { View, Text } from 'react-native';
import BaseStyles from '../BaseStyles';

export default function ProfileScreen() {
	return (
		<View style={BaseStyles.container}>
			<Text>This is a user profile</Text>
		</View>
	);
}