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
     * Get user lists.
     */
	static async getMyLists() {
		try {

			// Request init configuration.
			const reqInit = {
				headers: {
					...await AccountService.getAuthHeader(),
					'Content-Type': 'application/json'
				}
			};

			// Get response.
			const response = await fetch(BASE_ENDPOINT, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('No tiene autorización para obtener sus listas', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error al intentar obtener sus listas', null, response.status);

			const responseJson = await response.json();
            
			// Parse results to model.
			const lists = responseJson.map(list => new ListModel(list.isDefault, list.name, list.isPublic, list.mediaItems, list._id));
			return lists;
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error inesperado', err, 500);
		}
	}

	static async getListById(id) {
		try {

			const endpoint = `${BASE_ENDPOINT}/${id}`;

			// Request init configuration.
			const reqInit = {
				headers: {
					...await AccountService.getAuthHeader(),
					'Content-Type': 'application/json'
				}
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('No tiene autorización para obtener sus listas', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error al intentar obtener sus listas', null, response.status);

			const responseJson = await response.json();
            
			return new ListModel(responseJson.isDefault, responseJson.name, responseJson.isPublic, responseJson.mediaItems, responseJson._id);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error inesperado', err, 500);
		}
	}

	static async deleteListById(id) {
		try {
			const endpoint = `${BASE_ENDPOINT}/${id}`;


			// Request init configuration.
			const reqInit = {
				headers: {
					...await AccountService.getAuthHeader(),
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('No tiene autorización para eliminar esta lista', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error al intentar eliminar una lista', null, response.status);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error inesperado', err, 500);
		}
	}

	static async deleteListItem(id, mediaType, mediaId) {
		try {
			const endpoint = `${BASE_ENDPOINT}/${id}/item/${mediaType}/${mediaId}`;

			// Request init configuration.
			const reqInit = {
				headers: {
					...await AccountService.getAuthHeader(),
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			};

			// Get response.
			const response = await fetch(endpoint, reqInit);

			if (response.status === 401)
				throw ErrorHandler.handle('No tiene autorización para eliminar este elemento de lista', null, response.status);
			else if (response.status !== 200)
				throw ErrorHandler.handle('Se produjo un error al intentar eliminar un elemento de lista', null, response.status);
		}
		catch (err) {
			throw ErrorHandler.handle('Se produjo un error inesperado', err, 500);
		}
	}
}