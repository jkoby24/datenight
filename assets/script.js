// Create a function that filters by page and by the user criteria
function getRandomMovie() {
    // Get a random page from the API search
    let minPage = 1;
    let maxPage = 5;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
    let randomPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;
    // Get a random page for the response
    let minResult = 1;
    let maxResult = 5;
    minResult = Math.ceil(minResult);
    maxResult = Math.floor(maxResult);
    let randomResult = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult;
    // Filter function for user inputs
    
    // Ajax call for movie API
    $("#find-movie").on("click", function(event) {
        event.preventDefault();
        // var movieGenre = $("#movie-input").val();
        var apiKey = "&api_key=256449bbf2521fc4f3d50cafe73d76f7";
        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?" + apiKey + "&language=en-US&page=" + randomPage;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Log the information to the console
            console.log(response)
            // Show the random movie result on the page
            var movie = response.results[randomResult];
            var movieResult = $("<h2>").text(movie.original_title);
            var moviePoster = $("<img>").attr("src", "http://image.tmdb.org/t/p/w185/" + movie.poster_path);
            $("#movie-result").append(movieResult);
            $("#movie-result").append(moviePoster);
        })
    });
}
// Run the random movie function when the find-movie button is clicked
var randomMovieBtn = $("#find-movie").on("click", getRandomMovie())
// Create a function that gets a random recipe from the spoonacular API
function getRandomRecipe() {
    // Ajax call for recipe API
    $("#find-recipe").on("click", function(event) {
        event.preventDefault();
        // var recipe = $("#recipe-input").val();
        var apiKey = "&apiKey=5f8dbab87b794a1cbed5569a8c90a979"; 
        var queryURL = "https://api.spoonacular.com/recipes/random?" + apiKey;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Log the information to the console
            console.log(response)
            // Show the recipe on the page
            var recipeResult = $("<h2>").text(response.recipes[0].title);
            var recipeImg = $("<img>").attr("src", response.recipes[0].image);
            // var recipeLink = $("<a>").attr("href", response.recipes[0].sourceUrl  + "Get the recipe!");
            $("#recipe-result").append(recipeResult);
            $("#recipe-result").append(recipeImg);
            // $("#recipe-result").append(recipeLink);
        })
    });
}
// Run the random movie function when the find-movie button is clicked
var randomRecipeBtn = $("#find-recipe").on("click", getRandomRecipe())