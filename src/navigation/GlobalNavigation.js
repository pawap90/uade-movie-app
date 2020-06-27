
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import { connect } from 'react-redux';
import RequiredLoginScreen from '../screens/RequiredLoginScreen';
import TabBarNavigation from './TabBarNavigation';
import PropTypes from 'prop-types';

const Stack = createStackNavigator();


const GlobalNavigation = (props) => {
	
	const { isLoggedIn } = props;
	
	return (
		<Stack.Navigator screenOptions={{header: () => null}}>
			<Stack.Screen name="TabBar" component={() => TabBarNavigation(isLoggedIn)} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="RequiredLogin" options={{ animationEnabled: false }} component={RequiredLoginScreen} />
		</Stack.Navigator>
	);
};

GlobalNavigation.propTypes = {
	isLoggedIn: PropTypes.bool
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	};
};

export default connect(mapStateToProps)(GlobalNavigation);