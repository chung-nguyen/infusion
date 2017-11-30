import {combineReducers} from "redux";
import appNav from "./navigatorApp/reducer";
import authenticate from "./authenticate/reducer";
import appState from "./appState/reducer";

// Combines all reducers to a single reducer function
// const reducer = combineReducers({
//     appNav,
//     authenticate,
//     appState
// });
//
// export default reducer;

export default {
    appNav,
    authenticate,
    appState
}
