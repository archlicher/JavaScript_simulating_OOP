var imdb = imdb || {};

(function (scope) {
	function loadHtml(selector, data) {
		var container = document.querySelector(selector),
			moviesContainer = document.getElementById('movies'),
			detailsContainer = document.getElementById('details'),
			genresUl = loadGenres(data),
			moviesDiv;
		
		container.appendChild(genresUl);

		genresUl.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var genreId,
					genre,
					moviesHtml;

				genreId = parseInt(ev.target.getAttribute('data-id'));
				genre = data.filter(function (genre) {
					return genre._id === genreId;
				})[0];

				moviesHtml = loadMovies(genre.getMovies());
				moviesContainer.innerHTML = moviesHtml.outerHTML;
				moviesContainer.setAttribute('data-genre-id', genreId);
			}
		});	

		// Task 2 - add listener to display actors + actors info and reviews + reviews details
		moviesDiv = document.getElementById('movies');
		moviesDiv.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var movieId,
					movie;
				
				movieId = parseInt(ev.target.getAttribute('data-id'));

				data.forEach(function (genres) {
					genres.getMovies().filter(function (movieToGet){
						if (movieToGet._id === movieId) {
							movie = movieToGet;
						}
					})
				});

				loadActors(movie);

				loadReviews(movie);
			}
		});

		// Task 3 - Add event listener for delete button (delete movie button or delete review button)
		moviesDiv.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'BUTTON') {
				var movieId,
					movieHtml,
					movieToDelete,
					genre;

				movieId = parseInt(ev.target.parentNode.getAttribute('data-id'));
				movieHtml = ev.target.parentNode;
				movieHtml.parentNode.removeChild(movieHtml);

				data.forEach(function (genres) {
					genres.getMovies().filter(function (movieToGet){
						if (movieToGet._id === movieId) {
							movieToDelete = movieToGet;
						}
					})
				});

				data.forEach(function (genreToGet) {
					if(genreToGet.getMovies().indexOf(movieToDelete)>0){
						genre = genreToGet;
					}
				});

				data.forEach(function (genreToChange) {
					if(genreToChange._id === genre._id){
						genreToChange.deleteMovie(movieToDelete);
					}
				});
			}
		})
	}

	function loadGenres(genres) {
		var genresUl = document.createElement('ul');
		genresUl.setAttribute('class', 'nav navbar-nav');
		genres.forEach(function (genre) {
			var liGenre = document.createElement('li');
			liGenre.innerHTML = genre.name;
			liGenre.setAttribute('data-id', genre._id);
			genresUl.appendChild(liGenre);
		});

		return genresUl;
	}

	function loadMovies(movies) {
		var moviesUl = document.createElement('ul');
		movies.forEach(function (movie) {
			var liMovie = document.createElement('li');
			liMovie.setAttribute('data-id', movie._id);

			liMovie.innerHTML = '<h3>' + movie.title + '</h3>';
			liMovie.innerHTML += '<div>Country: ' + movie.country + '</div>';
			liMovie.innerHTML += '<div>Time: ' + movie.length + '</div>';
			liMovie.innerHTML += '<div>Rating: ' + movie.rating + '</div>';
			liMovie.innerHTML += '<div>Actors: ' + movie._actors.length + '</div>';
			liMovie.innerHTML += '<div>Reviews: ' + movie._reviews.length + '</div>';
			liMovie.innerHTML += '<button>Delete movie</button>';

			moviesUl.appendChild(liMovie);
		});

		return moviesUl;
	}

	function loadActors(movie) {
		var actorsHtml = movie._actors;
		var actorsUl = document.createElement('ul');
		actorsUl.innerHTML = '<h2>Actors</h2>';
		actorsHtml.forEach(function (actor){
			var liActor = document.createElement('li');
			liActor.innerHTML = '<h4>' + actor.name + '</h4>';
			liActor.innerHTML += '<div><strong>Bio:</strong>' + actor.bio + '</div>';
			liActor.innerHTML += '<div><strong>Born:</strong>' + actor.born + '</div>';

			actorsUl.appendChild(liActor);
		});

		document.body.appendChild(actorsUl);
	}

	function loadReviews(movie) {
		var	reviewsHtml = movie.getReviews();
		var reviewsUl = document.createElement('ul');
		reviewsUl.innerHTML = '<h2>Reviews</h2>';
		reviewsHtml.forEach(function (review){
			var liReview = document.createElement('li');
			liReview.innerHTML = '<h4>' + review.author + '</h4>';
			liReview.innerHTML += '<div><strong>Content:</strong>' + review.content + '</div>';
			liReview.innerHTML += '<div><strong>Date:</strong>' + review.date + '</div>';

			reviewsUl.appendChild(liReview);
		})

		document.body.appendChild(reviewsUl);
	}

	scope.loadHtml = loadHtml;
}(imdb));