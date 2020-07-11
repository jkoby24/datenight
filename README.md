# datenight - Alex Notes

# JavaScript Notes:
# Random Movie

        <div class="container">
            <div class="row">
                <button id="find-movie">Random Movie</button>
            </div>

            <div class="row" id="movie-result">
                <h3>Movie Result</h3>
            </div>
        </div>

The id in the script on the button is #find-movie. id="find-movie"

The div where the movie result is being appended to a div with the id movie-result. id="movie-result"

# Genre dropdown HTML
The below HTML is what I had for the dropdown with the genre options included.

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Options</label>
            </div>
            <select class="custom-select genre-select" id="inputGroupSelect01">
              <option selected>Choose...</option>
            </select>
            <button id="movie-genre">Find a Movie</button>
          </div>

          <div class="row" id="genre-choice">
            <h3>Genre Result</h3>
        </div>

This is from bootstrap. The important class is genre-select on the actual <select>
The important id is the inputGroupSelect01 on the <select>

The find a movie button needs the id="movie-genre" to activate that functionality

The results are appended to a div with the id="genre-choice"

# Random Recipe

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <button id="find-recipe">Find Recipe</button>
                </div>

                <div class="row" id="recipe-result">
                    <div class="col-md-12">
                        <h3>Recipe Result</h3>
                    </div>
                </div>
            </div>
        </div>

The id="find-recipe" is what is referenced in the script for the button.
The result is added to the div with the id="recipe-result".
