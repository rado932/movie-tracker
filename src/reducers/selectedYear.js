import { UPDATE_SELECTED_YEAR } from '../actions'

const selectedYear = (state = null, action) => {
    switch(action.type) {
        case UPDATE_SELECTED_YEAR:
            return action.selectedYear;
        default:
            return state;
    }
};

export default selectedYear;