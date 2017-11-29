import {combineReducers} from "redux";
import appNav from "./navigatorApp/reducer";

// Combines all reducers to a single reducer function
const reducer = combineReducers({
    appNav
});

export default reducer;
