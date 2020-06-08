function MoviesResponse (data) {
    this.page = data.page;
    this.total_results = data.total_results;
    this.total_pages = data.total_pages;
    this.results = data.results;
}

module.exports = MoviesResponse;