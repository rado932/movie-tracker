// action types
export const SAVE_MOVIE_DATA = 'SAVE_MOVIE_DATA';
export const SAVE_MOVIES_DATA = 'SAVE_MOVIES_DATA';
export const UPDATE_SELECTED_YEAR = 'UPDATE_SELECTED_YEAR';
export const UPDATE_SELECTED_GENRE = 'UPDATE_SELECTED_GENRE';
export const UPDATE_SELECTED_ID = 'UPDATE_SELECTED_ID';

// actions
export function saveMovieData(movieData) {
    return { type: SAVE_MOVIE_DATA, moviesData: movieData }
}

export function saveMoviesData(moviesData) {
    return { type: SAVE_MOVIES_DATA, moviesData }
}

export function updateYear(selectedYear) {
    return { type: UPDATE_SELECTED_YEAR, selectedYear }
}

export function updateGenre(selectedGenre) {
    return { type: UPDATE_SELECTED_GENRE, selectedGenre }
}

export function updateSelectedId(selectedId) {
    return { type: UPDATE_SELECTED_ID, selectedId }
}
