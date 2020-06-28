import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import GlobalNavigation from './src/navigation/GlobalNavigation';
import { navigationRef } from './RootNavigation';


const store = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer ref={navigationRef}>
				<GlobalNavigation></GlobalNavigation>
			</NavigationContainer>
		</Provider>
	);
};

// Disable warnings on expo client (temporally)
console.disableYellowBox = true;

export default App;