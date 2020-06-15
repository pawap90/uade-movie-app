'use strict';

/**
 * Class to represent a movie item.
 */
export default class MovieModel {
	/**
     * Constructor
     * @param {String} id Item identifier
     * @param {String} title Title
     * @param {String} imagePath Main image path
     * @param {Array<String>} genres Array of genres
     * @param {Date} releaseDate Release date
     * @param {String} summary Summary
     * @param {Array<String>} languages Languages
     */
	constructor(id, title, imagePath, genres, releaseDate, summary, languages) {
		this.id = id;
		this.title = title;
		this.imagePath = imagePath;
		this.genres = genres;
		this.releaseDate = releaseDate;
		this.summary = summary;
		this.languages = languages;
	}
}