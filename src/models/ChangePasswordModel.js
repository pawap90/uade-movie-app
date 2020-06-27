'use strict';

/**
 * Class to manage the login data.
 */
export default class ChangePasswordModel {
	/**
     * Constructor
     * @param {String} currentPassword User current Password 
     * @param {String} newPassword User new password
     */
	constructor(currentPassword, newPassword) {
		this.currentPassword = currentPassword;
		this.newPassword = newPassword;
	}
}