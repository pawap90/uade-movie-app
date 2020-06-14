'use strict';

/**
 * Class to represent a search result item.
 * Can be used to represent a movie result or a series resul.
 */
export default class SearchResultItemModel {
	/**
     * Constructor
     * @param {String} id Item identifier
     * @param {String} title Title
     * @param {String} imagePath Main image path
     * @param {Array<String>} genres Array of genres
     * @param {Number} year Release year
     * @param {String} summary Summary
     * @param {String} type Type of item (by default 'movie')
     */
	constructor(id, title, imagePath, genres, year, summary, type='movie') {
		this.id = id;
		this.title = title;
		this.imagePath = imagePath;
		this.genres = genres;
		this.year = year;
		this.summary = summary;
		this.type = type;
	}
}