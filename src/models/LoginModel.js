'use strict';

/**
 * Class to manage the login data.
 */
export default class LoginModel {
	/**
     * Constructor
     * @param {String} email User email
     * @param {String} password User password
     */
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}
}