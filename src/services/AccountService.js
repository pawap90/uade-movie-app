'use strict';

import { BACKEND_API_BASE_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

import LoginModel from '../models/LoginModel';
import ChangePasswordModel from '../models/ChangePasswordModel';
import AccountModel from '../models/AccountModel';
import RegisterModel from '../models/RegisterModel';
import ErrorHandler from '../errors/ErrorHandler';
import { ACCESS_TOKEN_STORAGE_KEY } from '../Constants';

const BASE_ENDPOINT = `${BACKEND_API_BASE_URL}/api/account`;

/**
 * Services to execute account operations through the systems backend API.
 */
export default class AccountService {

	/**
     * Get the current user's data.
     */
	static async getCurrentUserData() {
		try {
			const endpoint = `${BASE_ENDPOINT}/current-user`;

			// Request init configuration.
			const reqInit = {
				headers: await this.getAuthHeader()
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('El usuario no fue autorizado', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error obteniendo los datos del usuario', null, response.status);

			const responseJson = await response.json();

			// Parse results to model.
			const account = new AccountModel(
				responseJson.email,
				responseJson.name,
				responseJson.lastName,
				responseJson.genres
			);

			return account;
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error obteniendo datos del usuario', err, 500);
		}
	}

	/**
     * Login user and get access token.
	 * @param {LoginModel} loginModel Login data
     */
	static async login(loginModel) {

		try {
			if (!(loginModel instanceof LoginModel))
				throw new Error('The loginModel must be of type LoginModel');

			const endpoint = `${BASE_ENDPOINT}/login`;

			// Request init configuration.
			const reqInit = {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginModel),
				method: 'POST'
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('Las credenciales ingresadas son incorrectas', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error autorizando al usuario', null, response.status);

			const responseJson = await response.json();

			// Save JWT locally
			await storeAccessToken(responseJson.access);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error autorizando al usuario', err, 500);
		}
	}

	/**
	 * Register a new account.
	 * @param {RegisterModel} registerModel Register data
	 */
	static async register(registerModel) {

		try {
			if (!(registerModel instanceof RegisterModel))
				throw new Error('The registerModel must be of type RegisterModel');

			const endpoint = `${BASE_ENDPOINT}/register`;

			// Request init configuration.
			const reqInit = {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(registerModel),
				method: 'POST'
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 400)
				throw ErrorHandler.handle('El formulario no está completo', null, response.status);
			else if (response.status === 409)
				throw ErrorHandler.handle('Un usuario con ese correo ya fue registrado', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error registrando al usuario', null, response.status);

			const responseJson = await response.json();

			// Save JWT locally
			await storeAccessToken(responseJson.access);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error registrando al usuario', err, 500);
		}
	}

	/**
     * Logout user and remove the access token.
     */
	static async logout() {
		await removeAccessToken();
	}

	/**
     * Change user current password.
	 * @param {changePasswordModel} ChangePasswordModel Change Password data
     */
	static async changePassword(changePasswordModel) {
		try {
			if (!(changePasswordModel instanceof ChangePasswordModel))
				throw new Error('The ChangePasswordModel must be of type ChangePasswordModel');

			const endpoint = `${BASE_ENDPOINT}/change-password`;

			// Request init configuration.
			const reqInit = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': await getAccessToken(),
				},
				body: JSON.stringify(changePasswordModel),
				method: 'PUT'
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('No se pudo autorizar al usuario. Por favor, verifique la contraseña actual', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error al cambiar la contraseña', null, response.status);

			const responseJson = await response.json();

			return responseJson;
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error al cambiar la contraseña', err, 500);
		}
	}
	/**
     * Get the authorization header to authorizes the current user.
     */
	static async getAuthHeader() {
		return {
			'Authorization': await getAccessToken(),
		};
	}

	/**
	 * Get user's authentication status based on the access token.
	 */
	static async isLoggedIn() {
		const accessToken = await getAccessToken();
		return accessToken != null;
	}
}



/**
 * Get access token from local storage.
 */
const getAccessToken = async () => {
	const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
	return accessToken;
};

/**
 * Store access token into local storage.
 */
const storeAccessToken = async (accessToken) => {
	await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
};

/**
 * Remove access token from local storage.
 */
const removeAccessToken = async () => {
	await AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
};