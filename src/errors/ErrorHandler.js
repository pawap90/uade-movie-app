'use strict';

import UserError from './UserError';

/**
 * Class to turn errors into UserErrors
 */
export default class ErrorHandler {

	/**
     * Returns a UserError that can be exposed to the user
     * @param {String} message UserError message
     * @param {Error} innerError Original error (optional)
     * @param {Number} statusCode Status code for HTTP errors (optional)
     */
	static handle(message, innerError, statusCode) {
		if (innerError instanceof UserError)
			return innerError;

		return new UserError(message, innerError, statusCode);
	}
}