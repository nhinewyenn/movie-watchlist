/** @format */

const API_KEY = "f13b96aa";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search-input");
const exploreMovie = document.querySelector(".explore-movie");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

searchInput.addEventListener("keyup", (e) => {
  const target = e.target.value;
  console.log(target);
});

// // Search input
// infoSearch.addEventListener('keyup', async e => {
//   let res;
//   const target = e.target.value;
//   if (target) res = await fetch(`${url}/?name=${target}`);
//   else res = await fetch(url);
//   const data = await res.json();
//   showCharacter(data.results);
// });
