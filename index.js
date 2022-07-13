/** @format */

const API_KEY = "f13b96aa";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search-input");
const movieInfo = document.getElementById("movie-info");

function getMovieResult() {
  const target = searchInput.value;

  if (target) {
    fetch(`${BASE_URL}s=${target}`)
      .then((res) => res.json())
      .then((data) => {
        const { Search: movies } = data;

        // Get individual movie info
        for (const movie of movies) {
          fetch(`${BASE_URL}i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
      });
  }
}

searchBtn.addEventListener("click", getMovieResult);
