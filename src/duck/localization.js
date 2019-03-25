export const LOCALIZATION_CZ = "LOCALIZATION_CZ";
export const LOCALIZATION_EN = "LOCALIZATION_EN";

export const changeLocalizationCZ = string => {
    return dispatch => {
        dispatch({
            type: LOCALIZATION_CZ,
            string
        });
    };
};
export const changeLocalizationEN = string => {
    return dispatch => {
        dispatch({
            type: LOCALIZATION_EN,
            string
        });
    };
};

// ----- REDUCER -----
const initialState = {
    localization: "cz"
};

export default function localization(state = initialState, action) {
    switch (action.type) {
        case LOCALIZATION_CZ:
            return {
                ...state,
                localization: "cz"
            };
        case LOCALIZATION_EN:
            return {
                ...state,
                localization: "en"
            };
        default:
            return state;
    }
}
