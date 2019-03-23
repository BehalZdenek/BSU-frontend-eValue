// ----- ACTION -----

export const NOTES = "NOTES";

// ----- ACTION CREATORS -----

export const loadNotesList = data => {
    return dispatch => {
        dispatch({
            type: NOTES,
            data
        });
    };
};

// ----- REDUCER -----
const initialState = {};

export default function info(state = initialState, action) {
    switch (action.type) {
        case NOTES:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}
