'use strict';

/**
 * Class to represent a page of search results.
 */
export default class SearchResultModel {
	/**
     * Constructor
     * @param {Number} total Total search results
     * @param {Array} results Array of SearchResultItems.
     */
	constructor(total, results) {
		this.total = total;
		
		this.results = results;
	}
}