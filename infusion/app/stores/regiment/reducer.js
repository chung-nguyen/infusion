import {REHYDRATE} from "redux-persist/src/constants";
import * as common_types from "../action-types";

const DEFAULT_STATE = {
    id: null,
    dayPerInfusion: 0,
    numberOfInfusion: 0,
    startInfusionDate: 0
};

export default function regiment(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REHYDRATE:
            return {...state, ...action.payload.regimenInfo};

        case common_types.SYNC_FIREBASE_DATA:
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
