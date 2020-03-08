/*
    Current Issues:
*/

document.addEventListener('DOMContentLoaded', function(){
    var movieHTML = [];
    function renderMovies(movieArray) {
        movieHTML = movieArray.map(function(currentMovie) {
            return `
                    <div class="movie card m-2">
                        <img class="card-img-top" src="${currentMovie.Poster}" alt="Super Sick Image">
                        <div class="card-body">
                            <h4 class="card-title">${currentMovie.Title}</h4>
                            <div class="movie-year">${currentMovie.Year}</div>
                            <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</a>
                        </div>
                    </div>
            `
            
        })
        return movieHTML.join('');
    }

    // document.getElementById('movies-container').innerHTML = renderMovies(movieData);
    document.getElementById('search-form').addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('movies-container').innerHTML = renderMovies(movieData);
    })

})

function saveToWatchlist(imdbID) {
    var movie = movieData.find(function(currentMovie){
        return currentMovie.imdbID == imdbID;
    });

    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);

    if (watchlist == null) {
        watchlist = [];
    }

    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);
}