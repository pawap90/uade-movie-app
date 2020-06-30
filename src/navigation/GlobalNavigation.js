
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { connect, useDispatch } from 'react-redux';
import RequiredLoginScreen from '../screens/RequiredLoginScreen';
import TabBarNavigation from './TabBarNavigation';
import PropTypes from 'prop-types';
import AccountService from '../services/AccountService';
import { login } from '../actions/application';

const Stack = createStackNavigator();


const GlobalNavigation = (props) => {
	
	const { isLoggedIn } = props;
	const dispatch = useDispatch();

	useEffect(() => {
		const checkIfUserIsLoggedIn = async () => {
			const result = await AccountService.isLoggedIn();
			if(result) {
				dispatch(login);
			}
		};
		checkIfUserIsLoggedIn();
	},[]);
	
	return (
		<Stack.Navigator screenOptions={{header: () => null}}>
			<Stack.Screen name="TabBar" component={() => TabBarNavigation(isLoggedIn)} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="RequiredLogin" options={{ animationEnabled: false }} component={RequiredLoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
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