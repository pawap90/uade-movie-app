import { BACKEND_API_BASE_URL } from 'react-native-dotenv';
import ErrorHandler from '../errors/ErrorHandler';
import RateModel from '../models/RateModel';
import AccountService from './AccountService';

const BASE_ENDPOINT = `${BACKEND_API_BASE_URL}/api/rate`;

/**
 * Services to execute rate operations through the systems backend API.
 */
export default class RateService {

    /**
     * Save user rate for a media.
	 * @param {RateModel} rateModel Rate data
     */
    static async rateMedia(rateModel) {
        try {
            if (!(rateModel instanceof RateModel))
                throw new Error('The rateModel must be of type RateModel');

            // Request init configuration.
            const reqInit = {
                headers: {
                    ...await AccountService.getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rateModel),
                method: 'POST'
            };

            // Get response.
            const response = await fetch(BASE_ENDPOINT, reqInit);

            if (response.status === 401)
                throw ErrorHandler.handle('No tiene autorización para realizar una calificación', null, response.status);
            else if (response.status !== 200)
                throw ErrorHandler.handle('Se produjo un error al intentar calificar', null, response.status);
        }
        catch (err) {
            throw ErrorHandler.handle('Se produjo un error inesperado', err, 500);
        }
    }

    static async getMediaRates(mediaType, mediaId) {
        try {
            if (!mediaType || !mediaId)
                throw new Error('MediaType and mediaId are required');

			const endpoint = `${BASE_ENDPOINT}/${mediaType}/${mediaId}`;

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
                throw ErrorHandler.handle('No tiene autorización para obtener las calificaciones', null, response.status);
            else if (response.status !== 200)
                throw ErrorHandler.handle('Se produjo un error al intentar obtener las calificaciones', null, response.status);

            const responseJson = await response.json();
            
			// Parse results to model.
            const rates = responseJson.map(item => new RateModel(item.mediaType, item.mediaId, item.rating, item.comment, item.ratedByMe, item.ratedBy))
            return rates
        }
        catch (err) {
            throw ErrorHandler.handle('Se produjo un error inesperado', err, 500);
        }
    }
}