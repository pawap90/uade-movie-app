function Movie (data) {
    this.popularity = data.popularity;
    this.vote_count = data.vote_count;
    this.video = data.video;
    this.poster_path = data.poster_path;
    this.id = data.id;
    this.adult = data.adult;
    this.backdrop_path = data.backdrop_path;
    this.original_language = data.original_language;
    this.original_title = data.original_title;
    this.genre_ids =data.genre_ids;
    this.title = data.title;
    this.vote_average = data.vote_average;
    this.overview = data.overview;
    this.release_date = data.release_date;
}

module.exports = Movie;