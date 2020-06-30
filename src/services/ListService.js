'use strict';

import { BACKEND_API_BASE_URL } from 'react-native-dotenv';
import ErrorHandler from '../errors/ErrorHandler';
import ListModel from '../models/ListModel';
import AccountService from './AccountService';

const BASE_ENDPOINT = `${BACKEND_API_BASE_URL}/api/list`;

/**
 * Services to execute list operations through the systems backend API.
 */
export default class ListService {

	/**
	 * Create a new list
	 * @param {ListModel} listModel List data
	 */
	static async create(listModel) {

		try {
			if (!(listModel instanceof ListModel))
				throw new Error('The listModel must be of type ListModel');

			const endpoint = `${BASE_ENDPOINT}`;

			// Request init configuration.
			const reqInit = {
				headers: {
					...await AccountService.getAuthHeader(),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(listModel),
				method: 'POST'
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('El usuario no fue autorizado', null, response.status);
			else if (response.status === 400)
				throw ErrorHandler.handle('Por favor complete todos los datos del formulario', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error creando la lista', null, response.status);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error creando la lista', err, 500);
		}
	}
}