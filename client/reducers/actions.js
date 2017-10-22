export const NOTHING = "NOTHING";
export const SET_APP_STATE = "SET_APP_STATE";

export const SET_AUTHENTICATE_STATE = "SET_AUTHENTICATE_STATE";

export const nothing = () => {
    return {
        type: NOTHING
    };
};

export const setAppState = state => {
    return {
        type: SET_APP_STATE,
        state
    };
};

export const setAuthenticateState = state => {
    return {
        type: SET_AUTHENTICATE_STATE,
        state
    };
};
