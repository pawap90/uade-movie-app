'use strict';

/**
 * Class to represent a movie item.
 */
export default class MediaModel {
	/**
     * Constructor
     * @param {String} id Item identifier
     * @param {String} title Title
     * @param {String} imagePath Main image path
     * @param {Array<String>} genres Array of genres
     * @param {Date} releaseDate Release date
     * @param {String} summary Summary
     * @param {Array<String>} languages Languages
     * @param {Number} score Score
     * @param {Number} scoreCount Score count
     */
	constructor(id, title, imagePath, genres, releaseDate, summary, languages, score, scoreCount) {
		this.id = id;
		this.title = title;
		this.imagePath = imagePath;
		this.genres = genres;
		this.releaseDate = releaseDate;
		this.summary = summary;
		this.languages = languages;
		this.score = score / 2;
		this.scoreCount = scoreCount;
	}
}