import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/GenresSelectionScreen';
import MediaDetailsScreen from './src/screens/MediaDetailsScreen';
import BaseStyles from './src/BaseStyles';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createStackNavigator();


const App = () => {

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={setScreenOptions}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="MediaDetails" component={MediaDetailsScreen} />
				<Stack.Screen name="Search" component={SearchScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const setScreenOptions = ({ navigation }) => ({
	title: 'MovieApp',
	headerStyle: BaseStyles.header,
	headerTintColor: '#FFFFFF',
	headerRight: () => {
		return searchButton(navigation);
	}
});

const searchButton = (navigation) => {

	return (
		<TouchableWithoutFeedback onPress={() => navigation.push('Search', { searchTerm: 'jurassic' })}>
			<Text style={{ paddingHorizontal: 10, color: '#FFFFFF' }}>Buscar</Text>
		</TouchableWithoutFeedback>
	);
};

searchButton.displayName = 'SearchButton';

export default App;