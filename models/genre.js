var imdb = imdb || {};

(function (scope) {
	var genreId = 1;

	function Genre(name) {
		this.name = name;
		this._movies = [];
		this._id = genreId;
		genreId+=1;
	};

	Genre.prototype.addMovie = function addMovie(movie) {
		this._movies.push(movie);
	};

	Genre.prototype.deleteMovie = function deleteMovie(movieToDelete) {
		var index = this._movies.indexOf(movieToDelete);
		this._movies.splice(index,1);
	};

	Genre.prototype.deleteMovieById = function deleteMovieById(id) {
		var movieToDelete;
		this._movies.forEach(function (movie){
			if (movie._id === id) {
				movieToDelete = movie;
			}
		})
		this.deleteMovie.call(this, movieToDelete);
	};

	Genre.prototype.getMovies = function getMovies(){
		return this._movies;
	};

	scope.getGenre = function(name){
		return new Genre(name);
	};

}(imdb))