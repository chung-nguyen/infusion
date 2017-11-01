import { REHYDRATE } from "redux-persist/constants";

import * as ActionTypes from "./actions";

const DEFAULT_STATE = {};

export default function authenticate(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REHYDRATE:
            return { ...state, ...action.payload.authenticate };

        case ActionTypes.SET_AUTHENTICATE_STATE:
            return {
                ...action.state,
                ...state
            };
    }

    return state;
}
