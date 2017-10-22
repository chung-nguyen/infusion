import { combineReducers } from "redux";

import navState from "./navState";
import appState from "./appState";
import authenticate from "./authenticate";

const reduce = combineReducers({
    navState,
    appState,
    authenticate
});

export default function(state, action) {
    return reduce(state, action);
}
