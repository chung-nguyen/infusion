import { combineReducers } from "redux";

import navState from "./navState";
import appState from "./appState";

const reduce = combineReducers({
    navState,
    appState
});

export default function(state, action) {
    return reduce(state, action);
}
