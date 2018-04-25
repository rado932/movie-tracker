/**
 * Simulates an API call GET /movies
 * Actually reads a .json file
 * @param callback - required: function that will update the state of the app
 */
export function getMoviesAPI(callback) {
    if (typeof callback !== "function") return;
    fetch(`/movies.json`)
        .then((res) => res.json())
        .then(
            (result) => {
                callback(result);
            },
            (error) => {
                console.log("ERROR fetching the moviesData");
                console.log(error);
            }
        );
}

/**
 * Simulates an API call PUT /movies
 * DOESN'T save any changes between restarts.
 * @param movieToEdit - required to have an id and the fields that are changed
 * @param callback - required: function that will update the state of the app
 */
export function putMovieAPI(movieToEdit, callback) {
    if (typeof movieToEdit !== "object") return;
    if (typeof callback !== "function") return;

    callback(movieToEdit);
}