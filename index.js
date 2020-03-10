/*
    Current Issues:

    OMDB API:
    - Append to all API requests, limit 1000 calls per day
        http://www.omdbapi.com/?i=tt3896198&apikey=6ab2e908
*/

var responseData;
document.addEventListener('DOMContentLoaded', function(){
    var movieHTML = [];
    function renderMovies(movieArray) {
        movieHTML = movieArray.map(function(currentMovie) {
            return `
                    <div class="movie card m-2">
                        <img class="card-img-top" style="width: 300px; height: 443px;" src="${currentMovie.Poster}" alt="Super Sick Image">
                        <div class="card-body" style="width: 300px;">
                            <h4 class="card-title">${currentMovie.Title}</h4>
                            <div class="movie-year">${currentMovie.Year}</div>
                            <a class="btn btn-primary" id="${currentMovie.imdbID}" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</a>
                        </div>
                    </div>
            `
            
        })
        return movieHTML.join('');
    }

    // document.getElementById('movies-container').innerHTML = renderMovies(movieData);
    document.getElementById('search-form').addEventListener('submit', function(e){
        e.preventDefault();
        var searchString = document.getElementById('search-bar').value;
        var urlEncodedSearchString = encodeURIComponent(searchString);

        axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=6ab2e908&s=" + urlEncodedSearchString)
            .then(function(response){
                responseData = response.data.Search;
                document.getElementById('movies-container').innerHTML = renderMovies(response.data.Search); 
                console.log(response.data);
            });

        // document.getElementById('movies-container').innerHTML = renderMovies(movieData);
    })

})

function saveToWatchlist(imdbID) {
    var movie = responseData.find(function(currentMovie){
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
    document.getElementById(`${imdbID}`).innerText = "Added..."
}