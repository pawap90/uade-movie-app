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
	constructor(email, name, lastName, genres) {
		this.email = email;
		this.name = name;
		this.lastName = lastName;
		this.genres = genres;
	}
}