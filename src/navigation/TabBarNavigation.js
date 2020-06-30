import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import HomeIcon from '../../assets/home.png';
import ListIcon from '../../assets/list.png';
import UserIcon from '../../assets/user.png';
import BaseStyles from '../BaseStyles';
import NavBar from '../components/NavBar';
import * as RootNavigation from '../../RootNavigation';

// Screens
import SearchScreen from '../screens/SearchScreen';
import GenreSelectionScreen from '../screens/GenreSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListsScreen from '../screens/ListsScreen';
import ListDetailsScreen from '../screens/ListDetailsScreen';
import MediaDetailsScreen from '../screens/MediaDetailsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ListCreateScreen from '../screens/ListCreateScreen';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyListsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export default function TabBarNavigation(isLoggedIn) {
	return (
		<Tab.Navigator screenOptions={setTabBarScreenOptions} tabBarOptions={setTabBarOptions}>
			<Tab.Screen
				name="Mis listas"
				listeners={() => handleAnonymousUsersInteractions(isLoggedIn, 'Debe autenticarse en la app para poder ver sus listas de series y peliculas')}
				component={MyListsStackScreen}
			/>
			<Tab.Screen name="Inicio" component={HomeStackScreen} />
			<Tab.Screen
				name="Perfil"
				listeners={() => handleAnonymousUsersInteractions(isLoggedIn, 'Debe autenticarse en la app para poder ver su perfil de usuario')}
				component={ProfileStackScreen}
			/>
		</Tab.Navigator>
	);
}

const handleAnonymousUsersInteractions = (isLoggedIn, message) => {
	return {
		tabPress: e => {
			if (!isLoggedIn) {
				e.preventDefault();
				RootNavigation.navigate('RequiredLogin', { message: message });
			}
		}
	};
};

const setTabBarScreenOptions = ({ route }) => {
	const screenOptions = {
		tabBarIcon: ({ focused }) => {
			let icon;

			switch (route.name) {
			case 'Inicio':
				icon = HomeIcon;
				break;

			case 'Mis listas':
				icon = ListIcon;
				break;

			default:
				icon = UserIcon;
				break;
			}

			return <Image source={icon} style={{ ...BaseStyles.tabBarIcon, tintColor: focused ? '#E6D72A' : '#FFFFFF' }} />;
		}
	};

	screenOptions.tabBarIcon.displayName = 'TabBarIcon';
	screenOptions.tabBarIcon.propTypes = {
		focused: PropTypes.bool
	};

	return screenOptions;
};

const setStackedScreensOptions = (includeSearch = true) => {
	const screenOptions = {
		title: 'MovieApp',
		headerStyle: BaseStyles.header,
		headerTintColor: '#FFFFFF',
		header: ({ scene, previous, navigation }) => {
			return <NavBar scene={scene} previous={previous} navigation={navigation} includeSearch={includeSearch} />;
		}
	};

	screenOptions.header.displayName = 'NavBar';
	screenOptions.header.propTypes = {
		scene: PropTypes.object,
		previous: PropTypes.bool,
		navigation: PropTypes.object
	};

	return screenOptions;
};

const setTabBarOptions = ({
	style: {
		backgroundColor: '#344251',
		borderTopColor: 'transparent'
	},
	activeTintColor: '#E6D72A',
	inactiveTintColor: '#FFFFFF'
});

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator initialRouteName="Home" screenOptions={setStackedScreensOptions}>
			<HomeStack.Screen name="Home" component={HomeScreen} />
			<HomeStack.Screen name="MediaDetails" component={MediaDetailsScreen} />
			<HomeStack.Screen name="Search" component={SearchScreen} />
		</HomeStack.Navigator>
	);
};

const MyListsStackScreen = () => {
	return (
		<MyListsStack.Navigator screenOptions={() => setStackedScreensOptions(false)}>
			<MyListsStack.Screen name="MyLists" component={ListsScreen} />
			<MyListsStack.Screen name="ListDetails" component={ListDetailsScreen} />
			<HomeStack.Screen name="MediaDetails" component={MediaDetailsScreen} />
			<MyListsStack.Screen name="ListCreate" component={ListCreateScreen} />
		</MyListsStack.Navigator>
	);
};

const ProfileStackScreen = () => {
	return (
		<ProfileStack.Navigator initialRouteName="Profile" screenOptions={() => setStackedScreensOptions(false)}>
			<ProfileStack.Screen name="Profile" component={ProfileScreen} />
			<ProfileStack.Screen name="GenreSelection" component={GenreSelectionScreen} />
			<ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
		</ProfileStack.Navigator>
	);
};