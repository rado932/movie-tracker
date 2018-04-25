import { UPDATE_SELECTED_ID } from '../actions'

const selectedId = (state = null, action) => {
    switch(action.type) {
        case UPDATE_SELECTED_ID:
            if (action.selectedId < -1) return state;
            return action.selectedId;
        default:
            return state;
    }
};

export default selectedId;