import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import TabBarNavigation from './src/navigation/TabBarNavigation';

const store = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TabBarNavigation></TabBarNavigation>
			</NavigationContainer>
		</Provider>
	);
};

export default App;