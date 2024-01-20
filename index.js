const searchForm = document.querySelector('.search-container');
const movieContainer= document.querySelector('.movieContainer');
const inputBox = document.querySelector('.inputBox');

//function to fetch movie details using OMDB API
const getMovieInfo = async(movie) => {

    try {
        const myAPIKey = "e1ad6028";
        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=e1ad6028&t=${movie}`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch Movie data.");
        }

        const data = await response.json();

        showMovieData(data);
    } 
    catch (error) {
        showErrorMessage("No Movie Found!!!");
    }
     
     
}


const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2> ${message} </h2>`;
        movieContainer.classList.add('noBackground');
}


// function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `<h2> ${Title} </h2>
                              <p> <strong>Rating:&#11088; </strong>${imdbRating} </p>`;
    
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p> <strong> Released Date: </strong> ${Released} </p>
                            <p> <strong> Duration: </strong> ${Runtime}
                            <p> <strong> Cast: </strong> ${Actors}
                             <p> <strong> Plot: </strong> ${Plot}`;


    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src = "${Poster}"/>`;


    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);

}



// Adding event listener to search form
searchForm.addEventListener('submit', (e) =>{
     e.preventDefault();
     const movieName = inputBox.value.trim();
     if(movieName != ''){
         showErrorMessage("Fetching Movie Information");
         getMovieInfo(movieName);
     }
     else{
        showErrorMessage("Enter Movie Name to get Movie Information");    
     }
});
















