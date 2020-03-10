/*
    Current Issues:
    - watchlistHTML seems to be empty everytime it is run
    
    OMDB API:
    - Append to all API requests
        http://www.omdbapi.com/?i=tt3896198&apikey=6ab2e908
*/

// Render watchlist from localStorage to page

document.addEventListener('DOMContentLoaded', function(){
    var watchlistArr = localStorage.getItem('watchlist');
    // console.log(watchlistArr);
    var watchlistHTML = [];
    function renderMovies(watchlistArr) {
        watchlistHTML = watchlistArr.map(function(currentMovie){
            return `
                <div class="movie card m-2">
                    <img class="card-img-top" src="${currentMovie.Poster}" alt="Super Sick Image">
                    <div class="card-body">
                        <h4 class="card-title">${currentMovie.Title}</h4>
                        <div class="movie-year">${currentMovie.Year}</div>
                    </div>
                </div>
            `
        }) 

        return watchlistHTML.join('');
    }

    document.getElementById('movies-container').innerHTML = renderMovies(watchlistHTML);
})