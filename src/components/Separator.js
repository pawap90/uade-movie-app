import { View, StyleSheet } from 'react-native';
import React from 'react';

export default function Separator() {
	return (
		<View style={styles.container}></View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.5,
		borderColor: '#60C7AC',
		marginVertical: 12
	}
});