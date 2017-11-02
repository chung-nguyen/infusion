import { REHYDRATE } from "redux-persist/constants";

import * as ActionTypes from "./actions";

const DEFAULT_STATE = {
    id: null,
    dayPerInfusion: 0,
    numberOfInfusion: 0,
    startInfusionDate: 0
};

export default function appState(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REHYDRATE:
            return { ...state, ...action.payload.regimenInfo };

        case ActionTypes.SYNC_FIREBASE_DATA:
            if (action.path === "regimenInfo") {
                return {
                    ...state,
                    ...action.data
                };
            }
            break;
    }
    return state;
}
