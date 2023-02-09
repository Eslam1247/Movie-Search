const apiKey = "api_key=ceec1e0140e817513631b39d7b791100";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" +apiKey;
const imgURL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = BASE_URL + "/search/movie?"+apiKey;

function fetchData(API_URL){
    fetch(API_URL)
    .then(response => response.json())
    .then(result => moviesDetails(result.results))
}
fetchData(API_URL);

function moviesDetails(info){
    main.innerHTML = ``;
    info.forEach(movie =>{
        const {title , poster_path , vote_average , overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
        <img src="${imgURL+poster_path}" alt="${title}">           
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overView">
            <h3>Overview</h3>
                ${overview}
        </div>
        `
        main.appendChild(movieElement);

    })
}
function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else if(vote < 5){
        return 'red'
    }
}
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchValue = search.value;
    
    if(searchValue){
        fetchData(searchURL+"&query="+searchValue)
    }else{
        fetchData(API_URL)
    }
})