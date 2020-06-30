'use strict';

/**
 * Class to manage the register data.
 */
export default class RegisterModel {
	/**
     * Constructor
     * @param {String} email User email
	 * @param {String} password User password
     * @param {String} name User name
     * @param {String} lastName User lastname
     */
	constructor(email, name, lastName, password) {
		this.email = email;
		this.name = name;
		this.lastName = lastName;
		this.password = password;
	}
}