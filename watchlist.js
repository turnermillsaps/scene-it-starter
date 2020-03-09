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
                        <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</a>
                    </div>
                </div>
            `
        }) 

        return watchlistHTML.join('');
    }

    document.getElementById('movies-container').innerHTML = renderMovies(watchlistHTML);
})