import { UPDATE_SELECTED_GENRE } from '../actions'

const selectedGenre = (state = null, action) => {
    switch(action.type) {
        case UPDATE_SELECTED_GENRE:
            return action.selectedGenre;
        default:
            return state;
    }
};

export default selectedGenre;