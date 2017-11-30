import {REHYDRATE} from "redux-persist/src/constants";
import * as types from "./action-types";

const DEFAULT_STATE = {};

export default function authenticate(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case REHYDRATE:
            return action.payload ? {...state, ...action.payload.authenticate} : state;
        case types.SET_AUTHENTICATE_STATE:
            return {
                ...action.state,
                ...state
            };
    }

    return state;
}