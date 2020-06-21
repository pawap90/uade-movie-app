'use strict';

import { BACKEND_API_BASE_URL } from 'react-native-dotenv';
import LoginModel from '../models/LoginModel';
import AccountModel from '../models/AccountModel';
import ErrorHandler from '../errors/ErrorHandler';

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
				headers: this.getAuthHeader()
			};

			// Get response.
			// const response = await fetch(endpoint, reqInit);
			const response = await fetch(endpoint);

			if (response.status === 401)
				throw ErrorHandler.handle('El usuario no fue autorizado', null, response.status);

			const responseJson = await response.json();

			// Parse results to model.
			const account = new AccountModel(
				responseJson.id,
				responseJson.original_title
			);

			return account;
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error obteniendo datos del usuario', err, 500);
		}
	}

	/**
     * Get the current user's data.
	 * @param {LoginModel} loginModel Login data
     */
	static async login(loginModel) {

		try {
			if (!(loginModel instanceof LoginModel))
				throw new Error('The loginModel must be of type LoginModel');

			const endpoint = `${BASE_ENDPOINT}/login`;

			// Request init configuration.
			const reqInit = {
				body: JSON.stringify(loginModel)
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('Las credenciales ingresadas son incorrectas', null, response.status);

			const responseJson = await response.json();

			// Save JWT locally
			storeAccessToken(responseJson.access);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error autorizando al usuario', err, 500);
		}
	}

	/**
     * Get the authorization header to authorizes the current user.
     */
	static getAuthHeader() {
		return {
			'Authorization': getAccessToken(),
		};
	}
}

const getAccessToken = () => {
	// TO-DO
	return '';

}

const storeAccessToken = (accessToken) => {
	// TO-DO
}