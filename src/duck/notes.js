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

export default function notes(state = initialState, action) {
    switch (action.type) {
        case NOTES:
            return {
                ...state,
                allNotes: action.data
            };
        default:
            return state;
    }
}
