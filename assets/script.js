
$(document).ready(function(){
    // creates a function to bring back results based on user selected criteria 
    function getRecipe(cuisine){
        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?&apiKey=c05aaefb745840dca189fcf4629c74d6&cuisine=" + cuisine + "&number=1&addRecipeInformation=true&fillIngredients=false"
      $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // dynamically creates elements based on api call 
        var recipeResult = $("<h2>").text(response.results[0].title);
        var recipeImg = $("<img>").attr("src", response.results[0].image);
        var readyIn = response.results[0].readyInMinutes;
        var line2 = $('<p>').text('Preperation minutes:' + ' ' + readyIn)
        var link = response.results[0].sourceUrl;
        // creates a link based on api call 
        var line3 = $('<a>').text('Click this link to get recipe information').attr('href',  link)
        //Information is appended to recipe div 
        $('#recipe-result').append(recipeResult).append(recipeImg).append(line2).append(line3);
    ;
    });
    };
    function getRandomRecipe(){
        var queryURL = "https://api.spoonacular.com/recipes/random?&apiKey=c05aaefb745840dca189fcf4629c74d6"
      $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            var recipeResult = $("<h2>").text(response.recipes[0].title);
            var recipeImg = $("<img>").attr("src", response.recipes[0].image)
            var readyIn = response.recipes[0].readyInMinutes;
            var line2 = $('<p>').text('Preperation minutes:' + ' ' + readyIn)
            var link = response.recipes[0].sourceUrl;
            var line3 = $('<a>').text('Click this link to get recipe information').attr('href',  link)
            $('#recipe-result').append(recipeResult).append(recipeImg).append(line2).append(line3);
    });
    };
    $('#recipe-search-btn').on('click', function(event){
        event.preventDefault();
        $('#recipe-result').empty();
       var choice =  $('#cuisines').val()
         getRecipe(choice);
    }); 
    $('#random-search-btn').on('click', function(event){
        event.preventDefault();
        $('#recipe-result').empty();
        getRandomRecipe();
    }); 
    });

    // Create a function that filters by page and by the user criteria
function getRandomMovie() {
    // Get a random page from the API search
    let minPage = 1;
    let maxPage = 250;
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
        event.preventDefault();
        $("#movie-result").empty();
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
            var movieResult = $("<p>").text(movie.original_title);
            var moviePoster = $("<img>").attr("src", "http://image.tmdb.org/t/p/w185/" + movie.poster_path);
            var movieLinkUrl = "https://www.themoviedb.org/search?query=" + movieResult.text();
            $("#movie-result").append(movieResult);
            $("#movie-result").append(moviePoster);
            $("#movie-result").append("<br>");
            $("#movie-result").append($("<a>").text("Click this link to get information on this movie").attr("href", movieLinkUrl));
     });
}


// Run the random movie function when the find-movie button is clicked
$("#find-movie").on("click", getRandomMovie);
// Genres are originally set to id integers - Create a function to change each id integer to its associated string
function movieIdToGenre () {
        var apiKey = "&api_key=256449bbf2521fc4f3d50cafe73d76f7";
        var queryURL = "https://api.themoviedb.org/3/genre/movie/list?" + apiKey + "&language=en-US";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            // Defining the variables to find the list of genres
            var genreArr = response.genres;
            console.log(genreArr);
            // Add each genre to the dropdown list
            for (var i = 0; i < genreArr.length; i++) {
                // No documentaries found in the database - Removing this option from the dropdown
                if (genreArr[i].id != 99) {
                    var dropdownItem = $("<option>");
                    dropdownItem.attr("value", genreArr[i].id);
                    dropdownItem.text(genreArr[i].name);
                    $(".genre-select").append(dropdownItem)
                    console.log(dropdownItem);
                }
            }
        });
}
movieIdToGenre();
// Get a random movie based on the user selected genre
function getMovieByGenre () {
        // Copied from random movie function
        let lowPage = 1;
        let highPage = 500;
        lowPage = Math.ceil(lowPage);
        highPage = Math.floor(highPage);
        let randomPageChoice = Math.floor(Math.random() * (highPage - lowPage + 1)) + lowPage;
    // Ajax call for movie API
        $(".genre-choice").empty();
        var apiKey = "&api_key=256449bbf2521fc4f3d50cafe73d76f7";
        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?" + apiKey + "&language=en-US&page=" + randomPageChoice;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Log the information to the console
            console.log(response)
            // Show the random movie result by genre on the page
            var movieArr = response.results;
            console.log($(".genre-select").val());
            var filterArr = movieArr.filter((movie) => movie.genre_ids.includes(parseInt($(".genre-select").val())));
            console.log(filterArr);
            if (filterArr.length === 0) {
                getMovieByGenre();
            }
            else {
                var movieTitle = $("<p>").text(filterArr[0].original_title);
                var movieImg = $("<img>").attr("src", "http://image.tmdb.org/t/p/w185/" + filterArr[0].poster_path);
                var movieLink = "https://www.themoviedb.org/search?query=" + movieTitle;
                $(".genre-choice").append(movieTitle);
                $(".genre-choice").append(movieImg);
                $("#movie-result").append("<br>");
                $("#movie-result").append($("<a>").text("Click this link to get information on this movie").attr("href", movieLink));
            }
        });
}
// Run the movie by genre function
$("#movie-genre").on("click", getMovieByGenre);
