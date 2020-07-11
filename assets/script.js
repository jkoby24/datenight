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
            var movieResult = $("<h2>").text(movie.original_title);
            var moviePoster = $("<img>").attr("src", "http://image.tmdb.org/t/p/w185/" + movie.poster_path);
            $("#movie-result").append(movieResult);
            $("#movie-result").append(moviePoster);
        })
    });
}
// Run the random movie function when the find-movie button is clicked
$("#find-movie").on("click", getRandomMovie());

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
function getMovieByGenre (event) {
        // Copied from random movie function
        let lowPage = 1;
        let highPage = 500;
        lowPage = Math.ceil(lowPage);
        highPage = Math.floor(highPage);

        let randomPageChoice = Math.floor(Math.random() * (highPage - lowPage + 1)) + lowPage;
        
    // Ajax call for movie API
        event.preventDefault();
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
                var movieTitle = filterArr[0].original_title;
                var movieImg = $("<img>").attr("src", "http://image.tmdb.org/t/p/w185/" + filterArr[0].poster_path);
                $(".genre-choice").append(movieTitle);
                $(".genre-choice").append(movieImg);
            }


        });

}

// Run the movie by genre function
$("#movie-genre").on("click", getMovieByGenre);



// Create a function that gets a random recipe from the spoonacular API
function getRandomRecipe() {
    // Ajax call for recipe API
    $("#find-recipe").on("click", function(event) {
        event.preventDefault();
        $("#recipe-result").empty();
       

        var apiKey = "&apiKey=36c98c9c42a94c718bb0011d58688bea"; 
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
            var recipeLink = response.recipes[0].sourceUrl;
            $("#recipe-result").append(recipeResult);
            $("#recipe-result").append(recipeImg);
            $("#recipe-result").append($("<a>").text("Click this link to get recipe information").attr("href", recipeLink));
        })
    });
}

// Run the random movie function when the find-movie button is clicked
$("#find-recipe").on("click", getRandomRecipe());
