import { combineReducers } from "redux";

import navState from "./navState";
import appState from "./appState";
import authenticate from "./authenticate";
import regimenInfo from "./regimenInfo";
import sideEffect from "./sideEffect";

const reduce = combineReducers({
    navState,
    appState,
    authenticate,
    regimenInfo,
    sideEffect
});

export default function(state, action) {
    return reduce(state, action);
}
