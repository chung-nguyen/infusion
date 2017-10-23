import { REHYDRATE } from "redux-persist/constants";

import * as ActionTypes from "./actions";

const DEFAULT_STATE = {};

export default function appState(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case ActionTypes.SET_APP_STATE:
            if (!action.state) {
                return DEFAULT_STATE;
            }

            return {
                ...state,
                ...action.state
            };
    }

    return state;
}
