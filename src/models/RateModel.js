'use strict';

/**
 * Class to manage the rate data.
 */
export default class RateModel {
	/**
     * Constructor
     * @param {String} mediaType Media type
     * @param {String} mediaId Media id
     * @param {String} rating Rating score
     * @param {String} comment Rating comment
     * @param {Boolean} ratedByMe Rated by me
     * @param {String} ratedBy Rated by
     */
	constructor(mediaType, mediaId, rating, comment, ratedByMe = undefined, ratedBy = undefined) {
		this.mediaType = mediaType;
		this.mediaId = mediaId;
		this.rating = rating;
		this.comment = comment;
		this.ratedByMe = ratedByMe;
		this.ratedBy = ratedBy;
	}
}