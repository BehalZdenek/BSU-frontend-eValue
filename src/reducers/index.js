import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
//import { reducer as formReducer } from 'redux-form';
import notes from "../duck/notes";
import localization from "../duck/localization";

const rootReducer = combineReducers({
    router: routerReducer,
    // form: formReducer,
    notes,
    localization
});
export default rootReducer;
