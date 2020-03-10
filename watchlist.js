/*
    Current Issues:
        - Watched button does not render the page again, because renderMovies is only available in DOMContentLoaded
        - Watched button does not work
            - Does not remove movie from list

    OMDB API:
    - Append to all API requests, limit 1000 calls per day
        http://www.omdbapi.com/?i=tt3896198&apikey=6ab2e908
*/

// Render watchlist from localStorage to page

document.addEventListener('DOMContentLoaded', function(){
    var watchlist = JSON.parse(localStorage.getItem('watchlist'));
    // console.log(watchlistArr);
    function renderMovies(watchlistArr) {
        var watchlistHTML = watchlistArr.map(function(currentMovie){
            return `
                <div class="movie card m-2">
                    <img class="card-img-top" style="width: 300px; height: 443px;" src="${currentMovie.Poster}" alt="Super Sick Image">
                    <div class="card-body" style="width: 300px;">
                        <h4 class="card-title">${currentMovie.Title}</h4>
                        <div class="movie-year">${currentMovie.Year}</div>
                        <a class="btn btn-secondary" id="${currentMovie.imdbID}" onclick="removeFromWatchlist('${currentMovie.imdbID}')">Watched</a>
                    </div>
                </div>
            `
        }) 
        return watchlistHTML.join('');
    }
    document.getElementById('movies-container').innerHTML = renderMovies(watchlist);
})

function removeFromWatchlist(imdbID) {
    var responseData = JSON.parse(localStorage.getItem('watchlist'));
    var movieIndex = responseData.findIndex(function(currentMovie){
        return currentMovie.imdbID == imdbID;
    });

    responseData.splice(movieIndex, 1);
    console.log(responseData);
    localStorage.clear();
    localStorage.setItem('watchlist', JSON.stringify(responseData));
    document.getElementById(`${imdbID}`).innerText = "Removed..."
    // document.getElementById('movies-container').innerHTML = renderMovies(watchlist);
} 