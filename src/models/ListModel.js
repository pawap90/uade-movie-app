'use strict';
/**
 * Class to manage the list data.
 */
export default class ListModel {
	/**
     * Constructor
     * @param {Boolean} isDefault Is Default list?
     * @param {String} name List name
     * @param {Boolean} isPublic Is a public list?
     * @param {Array} mediaItems Media items
     * @param {String} _id List id
     */
	constructor(isDefault, name, isPublic, mediaItems, _id = undefined) {
		this.isDefault = isDefault;
		this.name = name;
		this.isPublic = isPublic;
		this.mediaItems = mediaItems;
		this._id = _id;
	}
}