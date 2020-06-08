import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'
import MediaDetailsScreen from './src/screens/MediaDetailsScreen';
import BaseStyles from './src/BaseStyles';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="MediaDetails" component={MediaDetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const screenOptions = {
	title: 'MovieApp',
	headerStyle: BaseStyles.header,
	headerTintColor: '#FFFFFF',
	headerRight: () => (
		<TouchableWithoutFeedback onPress={() => alert('Ir a la pantalla de búsqueda')}>
			<Text style={{paddingHorizontal: 10, color: '#FFFFFF' }}>Buscar</Text>
		</TouchableWithoutFeedback>
	)
}