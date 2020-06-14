'use strict';

import { MOVIEDB_API_BASE_URL, MOVIEDB_API_KEY } from 'react-native-dotenv';
import SearchResultItemModel from '../models/SearchResultItemModel';
import SearchResultModel from '../models/SearchResultModel';
import MovieModel from '../models/MovieModel';

let genresCache = null;
let configurationCache = null;

export default class MovieDbService {

	/**
     * Get a single movie by id.
     * @param {Number} id Movie identifier.
     */
	static async getMovie(id) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/movie/${id}?api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model.
		const movie = new MovieModel(
			responseJson.id,
			responseJson.original_title,
			await this.getImageUrl(responseJson.poster_path, 'w500'),
			responseJson.genres.map(g => {
				return g.name;
			}),
			new Date(responseJson.release_date),
			responseJson.overview
		);

		return movie;
	}

	/**
     * Search movies by query. 
     * @returns {SearchResultModel} Paginated results and total result count.
     * @param {Number} page Page number
     * @param {String} query Search query
     */
	static async searchMovies(page, query) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/search/movie?api_key=${MOVIEDB_API_KEY}&page=${page}&query=${query}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model.
		const searchResultItems = await Promise.all(responseJson.results.map(async r => {
			return new SearchResultItemModel(
				r.id,
				r.title,
				await this.getImageUrl(r.poster_path, 'w500'),
				await Promise.all(r.genre_ids.map(async gid => {
					return this.getGenre(gid);
				})),
				new Date(r.release_date).getFullYear(),
				r.overview
			);
		}));

		const searchResult = new SearchResultModel(responseJson.total_results, searchResultItems);

		return searchResult;
	}

	/**
     * Get genre from cache by id.
	 * Fills cache if empty
     * @param {String} id Genre identifier.
     */
	static async getGenre(id) {
		const genres = await getGenres();

		return genres.find(g => g.id == id).name;
	}

	/**
	 * Builds an image complete url.
	 * Fills cache if empty
	 * @param {String} path Image path
	 * @param {String} size Size code (Eg: w500, w300).
	 */
	static async getImageUrl(path, size) {
		const configuration = await getConfiguration();

		return `${configuration.images.base_url}${size}/${path}`;
	}
}

/**
 * Get movie genres and store them in cache (if cache is empty).
 */
const getGenres = async () => {
	if (!genresCache) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/genre/movie/list?api_key=${MOVIEDB_API_KEY}`;

		const response = await fetch(endpoint);
		const responseJson = await response.json();

		genresCache = responseJson.genres;
	}
	return genresCache;
};

/**
 * Get configuration and store it in cache (if cache is empty).
 */
const getConfiguration = async () => {
	if (!configurationCache) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/configuration?api_key=${MOVIEDB_API_KEY}`;

		const response = await fetch(endpoint);
		const responseJson = await response.json();

		configurationCache = responseJson;
	}
	return configurationCache;
};