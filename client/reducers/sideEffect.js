import * as ActionTypes from "./actions";

const DEFAULT_STATE = {};

export default function appState(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case ActionTypes.SET_SIDE_EFFECT_DATA:
            const { regimenID, daystamp, timestamp, data } = action;
            var newState = { ...state };

            newState[regimenID] = newState[regimenID] || {};
            var regimenState = newState[regimenID];

            regimenState[daystamp] = regimenState[daystamp] || {};
            var dailyState = regimenState[daystamp];

            dailyState[timestamp] = data;

            return newState;

        case ActionTypes.SYNC_FIREBASE_DATA:
            if (action.path === "sideEffect") {
                var newState = { ...state };
                const { subpaths, data } = action;

                var substate = newState;
                for (var i = 0; i < subpaths.length - 1; ++i) {
                    newState[subpaths[i]] = newState[subpaths[i]] || {};
                    substate = newState[subpaths[i]];
                }
                substate[subpaths[i]] = data;

                return newState;
            }
            break;
    }

    return state;
}
