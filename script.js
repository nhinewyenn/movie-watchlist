/** @format */

const API_KEY = "f13b96aa";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
let counter = 1;
const title = document.getElementById("app-title");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search-input");
const exploreMovie = document.querySelector(".explore-movie");
const btnContainer = document.querySelector(".btn-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const localStorageKey = Object.keys(localStorage);
console.log(localStorageKey);

function displayMovieResult(data) {
  const noImage = "./no-image.svg.webp";
  let dataImage = data.Poster;
  const watchList = data.imdbID;
  console.log(watchList);

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
        <button class="movie-watchlist add">
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
      .then((res) => res.json())
      .then((data) => {
        const { Search: movie } = data;
        console.log(movie);
        getIndividualMovie(movie);
        prevBtn.classList.add("hide");
      });
  }
}

function getIndividualMovie(movieData) {
  for (const movie of movieData) {
    fetch(`${BASE_URL}i=${movie.imdbID}`)
      .then((res) => res.json())
      .then((movieListData) => {
        btnContainer.classList.remove("hide");
        displayMovieResult(movieListData);
      });
    exploreMovie.innerHTML = "";
  }
}

function getPrevPage() {
  if ((counter = 1)) getMovieResult();
  else if (counter > 1) {
    fetch(`${BASE_URL}s=${searchInput.value}&page=${(counter -= 1)}`)
      .then((res) => res.json())
      .then((data) => {
        const { Search: movie } = data;
        getIndividualMovie(movie);
      });
  }
}

function getNextPage() {
  fetch(`${BASE_URL}s=${searchInput.value}&page=${(counter += 1)}`)
    .then((res) => res.json())
    .then((data) => {
      const { Search: movie } = data;
      getIndividualMovie(movie);
      if (counter > 1) prevBtn.classList.remove("hide");
    });
}

// EVENT LISTENERS
searchBtn.addEventListener("click", getMovieResult);
nextBtn.addEventListener("click", getNextPage);
prevBtn.addEventListener("click", getPrevPage);
// Reset page when clicking on the title
title.addEventListener("click", () => {
  exploreMovie.innerHTML = `
  <i class="icon fa-solid fa-film"></i>
   <h3>Start Exploring</h3>
  `;
  btnContainer.classList.add("hide");
});
