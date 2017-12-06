import * as types from './action-types';
import * as common_types from '../action-types';

const DEFAULT_STATE = {};

export default function appState(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SET_SIDE_EFFECT_DATA:
            const { regimenID, daystamp, timestamp, data } = action;
            let newState = { ...state };

            newState[regimenID] = newState[regimenID] || {};
            let regimenState = newState[regimenID];

            regimenState[daystamp] = regimenState[daystamp] || {};
            let dailyState = regimenState[daystamp];

            dailyState[timestamp] = data;

            return newState;
        case common_types.SYNC_FIREBASE_DATA:
            if (action.path === "sideEffect" && action.data) {
                let newState = { ...state };
                const { subpaths, data } = action;
                


                return newState;
            }
            break;
    }

    return state;
}
