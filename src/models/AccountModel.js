'use strict';

/**
 * Class to manage the account data.
 */
export default class AccountModel {
	/**
     * Constructor
     * @param {String} email User email
     * @param {String} name User name
     * @param {String} lastname User lastname
     * @param {Array<String>} genres User favorite genres
     */
	constructor(email, name, lastname, genres) {
		this.email = email;
		this.name = name;
		this.lastname = lastname;
		this.genres = genres;
	}
}
