/** @format */

const BASE_URL = `http://www.omdbapi.com/?apikey=f13b96aa&type=movie&`;
let counter = 1;
const title = document.getElementById("app-title");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search-input");
const exploreMovie = document.querySelector(".explore-movie");
const btnContainer = document.querySelector(".btn-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const watchlistMovies = JSON.parse(localStorage.getItem("data")) || [];

////////////////////////////////////////////
function renderMovie(data) {
  const noImage = "./no-image.svg.webp";
  let dataImage = data.Poster;

  exploreMovie.innerHTML += `
  <div id="cards">
      <img src="${dataImage === "N/A" ? noImage : dataImage}"/>

    <div class="movie-container">
      <div class="movie-info">
        <h2 class="movie-title">${data.Title}</h2>
        <span class="movie-rating">⭐️ IMDb Rating: ${data.imdbRating} </span>
      </div>
          
      <div class="movie-sub-info">
        <span class="movie-runtime">${data.Runtime}</span>
        <span class="movie-genre">${data.Genre}</span>
        <button class="watchlist-btn"
        onclick=addToWatchList("${data.imdbID}")>
          <i class="fa-solid fa-circle-plus"></i>
          <span class="watch-list">Watchlist</span>
        </button>
      </div>
        <p class="movie-plot">${data.Plot}</p>
    </div>
  </div>
  <div class="line"></div>    
  `;
}

function getMovieResult() {
  if (searchInput.value) {
    fetch(`${BASE_URL}s=${searchInput.value}&page=${counter}`)
      .then(res => res.json())
      .then(data => {
        prevBtn.classList.add("hide");
        getIndividualMovie(data.Search);
      })
      .catch(err => alert(`Something went wrong while getting your data`));
  }
}

function getIndividualMovie(movie) {
  for (const movieData of movie) {
    fetch(`${BASE_URL}i=${movieData.imdbID}`)
      .then(res => res.json())
      .then(movieListData => {
        btnContainer.classList.remove("hide");
        renderMovie(movieListData);
      })
      .catch(err => alert(`Something went wrong while getting your data`));
    exploreMovie.innerHTML = "";
  }
}

function getPrevPage() {
  if ((counter = 1)) getMovieResult();
  else if (counter > 1) {
    fetch(`${BASE_URL}s=${searchInput.value}&page=${(counter -= 1)}`)
      .then(res => res.json())
      .then(data => {
        getIndividualMovie(data.Search);
      })
      .catch(err => alert(`Something went wrong`));
  }
}

function getNextPage() {
  fetch(`${BASE_URL}s=${searchInput.value}&page=${(counter += 1)}`)
    .then(res => res.json())
    .then(data => {
      getIndividualMovie(data.Search);
      if (counter > 1) prevBtn.classList.remove("hide");
    })
    .catch(err => alert(`Something went wrong`));
}

function addToWatchList(imdbID) {
  const search = watchlistMovies.find(movie => movie.imdbID === imdbID) || [];
  if (search.imdbID === imdbID) {
    alert("Movie already added");
  } else {
    watchlistMovies.push({ imdbID: imdbID });
  }
  localStorage.setItem("data", JSON.stringify(watchlistMovies));
}

// EVENT LISTENERS
searchBtn.addEventListener("click", getMovieResult);
nextBtn.addEventListener("click", getNextPage);
prevBtn.addEventListener("click", getPrevPage);
// Reset page when clicking on the title
title.addEventListener("click", () => {
  exploreMovie.innerHTML = `
  <i class="icon fa-solid fa-film"></i>
   <h3>Start Exploring</h3>`;
  btnContainer.classList.add("hide");
});
// Show input results when press enter
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") getMovieResult();
});
