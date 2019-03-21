import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
//import { reducer as formReducer } from 'redux-form';
import info from "../duck/info";

const rootReducer = combineReducers({
    router: routerReducer,
    // form: formReducer,
    info
});
export default rootReducer;
