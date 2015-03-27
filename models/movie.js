var imdb = imdb || {};

(function (scope) {
	var movieId = 1;

	function Movie(title, length, rating, country) {
		this.title = title;
		this.length = length;
		this.rating = rating;
		this.country = country;
		this._actors = [];
		this._reviews = [];
		this._id = movieId;
		movieId+=1;
	};

	Movie.prototype.addActor = function addActor(actor) {
		this._actors.push(actor);
	};

	Movie.prototype.getActors = function addActor() {
		return this._actors;
	};

	Movie.prototype.addReview = function addReview(review) {
		this._reviews.push(review);
	};

	Movie.prototype.deleteReview = function deleteReview(reviewToDelete) {
		var index = this._reviews.indexOf(reviewToDelete);
		this._reviews.splice(index,1);	
	};

	Movie.prototype.deleteReviewById = function deleteReviewById(id) {
		var reviewToDelete;
		this._reviews.forEach(function (review){
			if (review._id === id) {
				reviewToDelete = review;
			}
		})
		this.deleteReview.call(this, reviewToDelete);
	};

	Movie.prototype.getReviews = function getReviews(){
		return this._reviews;
	};

	scope.getMovie = function(title, length, rating, country){
		return new Movie(title, length, rating, country);
	};

}(imdb))