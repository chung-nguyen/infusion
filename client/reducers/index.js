import { combineReducers } from "redux";

import navState from "./navState";
import appState from "./appState";
import authenticate from "./authenticate";
import regimenInfo from "./regimenInfo";

const reduce = combineReducers({
    navState,
    appState,
    authenticate,
    regimenInfo
});

export default function(state, action) {
    return reduce(state, action);
}
