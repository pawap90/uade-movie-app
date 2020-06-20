'use strict';

/**
 * Class to represent a media item.
 */
export default class MediaModel {
	/**
     * Constructor
     * @param {String} id Item identifier
     * @param {String} title Title
     * @param {String} imageUrl Main image url
     * @param {Array<String>} genres Array of genres
     * @param {Date} releaseDate Release date
     * @param {String} summary Summary
     * @param {Array<String>} languages Languages
     * @param {Number} score Score
     * @param {Number} scoreCount Score count
     */
	constructor(id, title, imageUrl, genres, releaseDate, summary, languages, score, scoreCount) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.genres = genres;
		this.releaseDate = releaseDate;
		this.summary = summary;
		this.languages = languages;
		this.score = score / 2;
		this.scoreCount = scoreCount;
	}
}