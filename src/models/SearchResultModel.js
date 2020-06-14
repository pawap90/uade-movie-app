import SearchResultItemModel from "./SearchResultItemModel";

/**
 * Class to represent a page of search results.
 */
export default class SearchResultModel {
    /**
     * Constructor
     * @param {Number} total Total search results
     * @param {Array<SearchResultItemModel>} results Array of result items.
     */
    constructor(total, results) {
        this.total = total;
        this.results = results;
    }
}
