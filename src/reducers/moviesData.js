import {SAVE_MOVIE_DATA, SAVE_MOVIES_DATA} from '../actions'
import {removeDuplicates} from "../utils";

const initialMoviesData = {
    movies: [],
    genres: [],
    years: []
};

const reducerGenre = (acc, movie) => acc.concat(movie.genre);
const sorterStr = (a,b) => a.localeCompare(b);
const sorterNum = (a,b) => a - b;

const moviesData = (state = initialMoviesData, action) => {
    switch(action.type) {
        case SAVE_MOVIE_DATA:
            // check is element to edit is provided
            const movieToEdit = action.moviesData;
            if (!movieToEdit) return state;

            let updatedMoviesData;
            if (movieToEdit.id === -1) {
                // add a new entry
                const nextId = Math.max.apply(Math,state.movies.map((movie) => movie.id)) + 1;
                movieToEdit.id = nextId;

                // add the new movie to updatedMoviesData
                updatedMoviesData = state.movies;
                updatedMoviesData.push(movieToEdit);
            } else {
                // search for element to be edited
                let elementNotFound = true;
                updatedMoviesData = state.movies.map(
                    movie => {
                        if (movie.id === movieToEdit.id) {
                            elementNotFound = false;
                            return movieToEdit;
                        }
                        return movie;
                    });

                // element not found: do nothing
                if (elementNotFound) return state;
            }
            // recalculate all genres and years
            const genres = removeDuplicates(updatedMoviesData.reduce(reducerGenre, [])).sort(sorterStr);
            const years = removeDuplicates(updatedMoviesData.map(movie => movie.year)).sort(sorterNum);

            return Object.assign({}, state, {
                movies: updatedMoviesData,
                genres: genres,
                years: years
            });
        case SAVE_MOVIES_DATA:
            // check is element to edit is provided
            const moviesData = action.moviesData;
            if (!moviesData) return state;

            const uniqueGenres = removeDuplicates(moviesData.reduce(reducerGenre, [])).sort(sorterStr);
            const uniqueYears = removeDuplicates(moviesData.map(movie => movie.year)).sort(sorterNum);

            return Object.assign({}, state, {
                movies: moviesData,
                genres: uniqueGenres,
                years: uniqueYears
            });
        default:
            return state;
    }
};

export default moviesData;