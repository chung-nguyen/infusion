import {REHYDRATE} from "redux-persist/src/constants";
import * as types from "./action-types";

const DEFAULT_STATE = {
    reHydrated: false
};

export default function appState(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SET_APP_STATE:
            if (!action.state) {
                return DEFAULT_STATE;
            }

            return {
                ...state,
                ...action.state
            };
        case REHYDRATE:
            return action.payload ? {...state, ...action.payload.appState, reHydrated: true} : {
                ...state,
                reHydrated: true
            };
    }

    return state;
}
