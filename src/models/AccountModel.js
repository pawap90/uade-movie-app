'use strict';

/**
 * Class to manage the account data.
 */
export default class MediaModel {
	/**
     * Constructor
     * @param {String} email User email
     * @param {String} password User password
     * @param {String} name User name
     * @param {String} lastname User lastname
     * @param {Array<String>} genres User favorite genres
     */
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.genres = genres;
    }
}