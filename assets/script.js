// test to make sure script.js linked to html
$(document).ready(function(){


function getRecipe(cuisine){
    apiKey= "c05aaefb745840dca189fcf4629c74d6"
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?&apiKey=c05aaefb745840dca189fcf4629c74d6&cuisine=" + cuisine + "&number=1&addRecipeInformation=true&fillIngredients=false"
  $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
    var recipeResult = $("<h2>").text(response.results[0].title);
    var recipeImg = $("<img>").attr("src", response.results[0].image);

    var readyIn = response.results[0].readyInMinutes;
    var line2 = $('<p>').text('Preperation minutes:' + ' ' + readyIn)

    var link = response.results[0].sourceUrl;
    
    var line3 = $('<a>').text('Click this link to get recipe information').attr('href',  link)

    $('#recipe-div').append(recipeResult).append(recipeImg).append(line2).append(line3);
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

    $('#recipe-div').append(recipeResult);
    $('#recipe-div').append(recipeImg)

});

};

$('#search-btn').on('click', function(event){
    event.preventDefault();
    $('#recipe-div').empty();
   var choice =  $('#cuisines').val()
     getRecipe(choice);
    if (choice == 'random') {
        getRandomRecipe()
    }
    else {
        return
    }
     ;
    
})  





});

