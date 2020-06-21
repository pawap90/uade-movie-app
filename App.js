import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MediaDetailsScreen from './src/screens/MediaDetailsScreen';
import BaseStyles from './src/BaseStyles';
import SearchScreen from './src/screens/SearchScreen';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import SearchButton from './src/components/SearchButton';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

const store = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home" screenOptions={setScreenOptions}>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="MediaDetails" component={MediaDetailsScreen} />
					<Stack.Screen name="Search" component={SearchScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

const setScreenOptions = () => {
	const screenOptions = {
		title: 'MovieApp',
		headerStyle: BaseStyles.header,
		headerTintColor: '#FFFFFF',
		headerRight: () => {
			return <SearchButton></SearchButton>;
		}
	};

	screenOptions.headerRight.displayName = 'SearchButton';

	return screenOptions;
};

export default App;