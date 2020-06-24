import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyListsScreen from '../screens/MyListsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeIcon from '../../assets/home.png';
import ListIcon from '../../assets/list.png';
import UserIcon from '../../assets/user.png';
import { Image } from 'react-native';
import SearchScreen from '../screens/SearchScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MediaDetailsScreen from '../screens/MediaDetailsScreen';
import React from 'react';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import ListDetailsScreen from '../screens/ListDetailsScreen';
import NavBar from '../components/NavBar';

export default function TabBarNavigation() {
	return (
		<Tab.Navigator screenOptions={setTabBarScreenOptions} tabBarOptions={setTabBarOptions}>
			<Tab.Screen name="Inicio" component={HomeStackScreen} />
			<Tab.Screen name="Mis listas" component={MyListsStackScreen} />
			<Tab.Screen name="Perfil" component={ProfileStackScreen} />
		</Tab.Navigator>
	);
}

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyListsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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

			return <Image source={icon} style={{...BaseStyles.tabBarIcon, tintColor: focused ? '#E6D72A' : '#FFFFFF'}} />;
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
			return <NavBar scene={scene} previous={previous} navigation={navigation} includeSearch={includeSearch}/>;
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
			<MyListsStack.Screen name="MyLists" component={MyListsScreen} />
			<MyListsStack.Screen name="ListDetails" component={ListDetailsScreen} />
			<HomeStack.Screen name="MediaDetails" component={MediaDetailsScreen} />
		</MyListsStack.Navigator>
	);
};

const ProfileStackScreen = () => {
	return (
		<ProfileStack.Navigator initialRouteName="Profile" screenOptions={() => setStackedScreensOptions(false)}>
			<ProfileStack.Screen name="Profile" component={ProfileScreen} />
		</ProfileStack.Navigator>
	);
};