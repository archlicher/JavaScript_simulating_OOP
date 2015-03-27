var imdb = imdb || {};

(function (scope) {
	var thertreId = 1;

	function Theatre(title, length, rating, country, isPuppet) {
		this.title = title;
		this.length = length;
		this.rating = rating;
		this.country = country;
		this.isPuppet = isPuppet;
		this._actors = [];
		this._reviews = [];
		this._id = thertreId;
		thertreId+=1;
	};

	Theatre.prototype.addActor = function addActor(actor) {
		this._actors.push(actor);
	};

	Theatre.prototype.getActors = function addActor() {
		return this._actors;
	};

	Theatre.prototype.addReview = function addReview(review) {
		this._reviews.push(review);
	};

	Theatre.prototype.deleteReview = function deleteReview(reviewToDelete) {
		var index = this._reviews.indexOf(reviewToDelete);
		this._reviews.splice(index,1);
	};

	Theatre.prototype.deleteReviewById = function deleteReviewById(id) {
		var reviewToDelete;
		this._reviews.forEach(function (review){
			if (review._id === id) {
				reviewToDelete = review;
			}
		})
		this.deleteReview.call(this, reviewToDelete);
	};

	Theatre.prototype.getReviews = function getReviews(){
		return this._reviews;
	};

	scope.getTheatre = function(title, length, rating, country, isPuppet){
		return new Theatre(title, length, rating, country, isPuppet);
	};

}(imdb))