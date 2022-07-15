/** @format */

const BASE_URL = `http://www.omdbapi.com/?apikey=f13b96aa&type=movie&`;
let watchlistMovies = JSON.parse(localStorage.getItem("data")) || [];
const exploreMovie = document.querySelector(".explore-movie");
console.log(watchlistMovies);

function renderWatchlist() {
  exploreMovie.innerHTML = "";
  if (watchlistMovies.length != 0) {
    watchlistMovies.map(movie => {
      fetch(`${BASE_URL}i=${movie.imdbID}`)
        .then(res => res.json())
        .then(data => {
          const noImage = "./no-image.svg.webp";
          let dataImage = data.Poster;

          exploreMovie.innerHTML += `
          <div id="cards">
              <img src="${dataImage === "N/A" ? noImage : dataImage}"/>

            <div class="movie-container">
              <div class="movie-info">
                <h2 class="movie-title">${data.Title}</h2>
                <span class="movie-rating">⭐️ IMDb Rating: ${
                  data.imdbRating
                } </span>
              </div>
          
              <div class="movie-sub-info">
                <span class="movie-runtime">${data.Runtime}</span>
                <span class="movie-genre">${data.Genre}</span>
                <button class="watchlist-btn"
                onclick=removeWatchlist("${data.imdbID}")>
                <i class="fa-solid fa-circle-minus"></i>
                <span class="watch-list">Remove</span>
                </button>
              </div>
                <p class="movie-plot">${data.Plot}</p>
            </div>
          </div>
          <div class="line"></div>`;
        });
    });
  } else {
    exploreMovie.innerHTML = `
     <h3 class="empty-watchlist">
        Your watchlist is looking a little empty...
      </h3>
      <p class="add-movie">
        <i class="fa-solid fa-circle-plus"></i>
        <a href="/index.html"> Let's add some movies!</a>
      </p>
    `;
  }
}
renderWatchlist();

function removeWatchlist(imdbID) {
  watchlistMovies = watchlistMovies.filter(movie => movie.imdbID !== imdbID);
  console.log(watchlistMovies);
  localStorage.setItem("data", JSON.stringify(watchlistMovies));
  renderWatchlist();
}
