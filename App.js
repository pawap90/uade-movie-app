import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MediaDetailsScreen from './src/screens/MediaDetailsScreen';
import BaseStyles from './src/BaseStyles';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createStackNavigator();


const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="MediaDetails" component={MediaDetailsScreen} />
				<Stack.Screen name="Search" component={SearchScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const searchButton = () => {
	return (
		<TouchableWithoutFeedback onPress={() => alert('Ir a la pantalla de búsqueda')}>
			<Text style={{ paddingHorizontal: 10, color: '#FFFFFF' }}>Buscar</Text>
		</TouchableWithoutFeedback>
	);
};
searchButton.displayName = 'SearchButton';

export default App;

const screenOptions = {
	title: 'MovieApp',
	headerStyle: BaseStyles.header,
	headerTintColor: '#FFFFFF',
	headerRight: searchButton
};