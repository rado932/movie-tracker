import { combineReducers } from 'redux';

import selectedGenre from './selectedGenre.js';
import moviesData from './moviesData.js';
import selectedId from './selectedId.js';
import selectedYear from './selectedYear.js';

const reducers = combineReducers({
    selectedGenre,
    moviesData,
    selectedId,
    selectedYear
});

export default reducers;