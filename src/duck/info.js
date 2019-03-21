//import createToast from '../helpers/createToast';
// ----- ACTION -----

export const DATA = "DATA";

// ----- ACTION CREATORS -----

export const dataLoad = data => {
    return dispatch => {
        dispatch({
            type: DATA,
            data
        });
    };
};

// ----- REDUCER -----
const initialState = {};

export default function info(state = initialState, action) {
    switch (action.type) {
        case DATA:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}
