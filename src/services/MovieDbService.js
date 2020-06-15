'use strict';

import { MOVIEDB_API_BASE_URL, MOVIEDB_API_KEY } from 'react-native-dotenv';
import SearchResultItemModel from '../models/SearchResultItemModel';
import SearchResultModel from '../models/SearchResultModel';
import MovieModel from '../models/MovieModel';

let movieGenresCache = null;
let seriesGenresCache = null;
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
			await this.getImageUrl(responseJson.poster_path, 'w300'),
			responseJson.genres.map(g => {
				return g.name;
			}),
			new Date(responseJson.release_date),
			responseJson.overview,
			responseJson.spoken_languages.map(sl => {
				return sl.name;
			})
		);

		return movie;
	}

	/**
     * Get similar movies by movie id.
     * @param {Number} id Movie identifier.
     * @param {Number} page Page number.
     */
	static async getSimilarMovies(id, page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/movie/${id}/similar?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const movies = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w185')
				)
			)
		);

		return movies;
	}

	/**
     * Get similar series by serie id.
     * @param {Number} id Serie identifier.
     * @param {Number} page Page number.
     */
	static async getSimilarSeries(id, page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/tv/${id}/similar?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const movies = await Promise.all(
			responseJson.results.map(async serie =>
				new MovieModel(
					serie.id,
					serie.original_name,
					await this.getImageUrl(serie.poster_path, 'w185')
				)
			)
		);

		return movies;
	}

	/**
     * Get top rated movies.
     * @param {Number} page Page number.
     */
	static async getTopRatedMovies(page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/movie/top_rated?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const movies = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w300')
				)
			)
		);

		return movies;
	}

	/**
     * Get top rated series.
     * @param {Number} page Page number.
     */
	static async getTopRatedSeries(page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/tv/top_rated?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const series = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w300')
				)
			)
		);

		return series;
	}

	/**
     * Get popular movies.
     * @param {Number} page Page number.
     */
	static async getPopularMovies(page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/movie/popular?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const movies = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w300')
				)
			)
		);

		return movies;
	}

	/**
     * Get popular series.
     * @param {Number} page Page number.
     */
	static async getPopularSeries(page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/tv/popular?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const series = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w300')
				)
			)
		);

		return series;
	}

	/**
     * Get upcoming movies.
     * @param {Number} page Page number.
     */
	static async getUpcomingMovies(page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/movie/upcoming?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const movies = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w300')
				)
			)
		);

		return movies;
	}

	/**
     * Get upcoming series.
     * @param {Number} page Page number.
     */
	static async getUpcomingSeries(page = 1) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/tv/upcoming?page=${page}&api_key=${MOVIEDB_API_KEY}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model
		const series = await Promise.all(
			responseJson.results.map(async movie =>
				new MovieModel(
					movie.id,
					movie.original_title,
					await this.getImageUrl(movie.poster_path, 'w300')
				)
			)
		);

		return series;
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
				await this.getImageUrl(r.poster_path, 'w300'),
				await Promise.all(r.genre_ids.map(async gid => {
					return this.getMovieGenre(gid);
				})),
				new Date(r.release_date).getFullYear(),
				r.overview
			);
		}));

		const searchResult = new SearchResultModel(responseJson.total_results, searchResultItems);

		return searchResult;
	}

	/**
	 * Search series by query. 
	 * @returns {SearchResultModel} Paginated results and total result count.
	 * @param {Number} page Page number
	 * @param {String} query Search query
	 */
	static async searchSeries(page, query) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/search/tv?api_key=${MOVIEDB_API_KEY}&page=${page}&query=${query}`;

		// Get response.
		const response = await fetch(endpoint);
		const responseJson = await response.json();

		// Parse results to model.
		const searchResultItems = await Promise.all(responseJson.results.map(async r => {
			return new SearchResultItemModel(
				r.id,
				r.name,
				await this.getImageUrl(r.poster_path, 'w500'),
				await Promise.all(r.genre_ids.map(async gid => {
					return this.getSeriesGenre(gid);
				})),
				new Date(r.first_air_date).getFullYear(),
				r.overview,
				'series'
			);
		}));

		const searchResult = new SearchResultModel(responseJson.total_results, searchResultItems);

		return searchResult;
	}

	/**
     * Get movie genre from cache by id.
	 * Fills cache if empty
     * @param {String} id Genre identifier.
     */
	static async getMovieGenre(id) {
		const genres = await getMovieGenres();

		return genres.find(g => g.id == id).name;
	}

	/**
     * Get series genre from cache by id.
	 * Fills cache if empty
     * @param {String} id Genre identifier.
     */
	static async getSeriesGenre(id) {
		const genres = await getSeriesGenres();

		return genres.find(g => g.id == id).name;
	}

	/**
	 * Builds an image complete url.
	 * Fills cache if empty
	 * @param {String} path Image path
	 * @param {String} size Size code (Eg: w300, w300).
	 */
	static async getImageUrl(path, size) {
		const configuration = await getConfiguration();

		return `${configuration.images.base_url}${size}/${path}`;
	}
}

/**
 * Get movie genres and store them in cache (if cache is empty).
 */
const getMovieGenres = async () => {
	if (!movieGenresCache) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/genre/movie/list?api_key=${MOVIEDB_API_KEY}`;

		const response = await fetch(endpoint);
		const responseJson = await response.json();

		movieGenresCache = responseJson.genres;
	}
	return movieGenresCache;
};

/**
 * Get series genres and store them in cache (if cache is empty).
 */
const getSeriesGenres = async () => {
	if (!seriesGenresCache) {
		const endpoint = `${MOVIEDB_API_BASE_URL}/genre/tv/list?api_key=${MOVIEDB_API_KEY}`;

		const response = await fetch(endpoint);
		const responseJson = await response.json();

		seriesGenresCache = responseJson.genres;
	}
	return seriesGenresCache;
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