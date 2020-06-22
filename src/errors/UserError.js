'use strict';

/**
 * Class to handle errors and turn them into something the user is allowed to see.
 */
export default class UserError extends Error {

	/**
     * 
     * @param {String} message Error message (this will most likely be seen by the user).
     * @param {Number} statusCode Status code for HTTP related errors
     * @param {Error} innerError Original error (this must never be seen by the user or print in the console)
     */
	constructor(message, innerError, statusCode) {
		super(message);

		this.name = this.constructor.name;
		this.statusCode = statusCode || 500;
		this.innerError = innerError;
	}
}