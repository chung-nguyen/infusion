import firebase from "react-native-firebase";

export const NOTHING = "NOTHING";
export const SET_APP_STATE = "SET_APP_STATE";
export const SYNC_FIREBASE_DATA = "SYNC_FIREBASE_DATA";

export const SET_AUTHENTICATE_STATE = "SET_AUTHENTICATE_STATE";
export const SET_REGIMEN_INFO = "SET_REGIMEN_INFO";

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
    return (dispatch, getState) => {
        if (state && state.user) {
            // Watch for firebase sync event
            const uid = state.user.uid;
            const ref = firebase.database().ref();
            ref
                .child("regimenInfo")
                .child(uid)
                .on("value", snapshot => {
                    dispatch(syncFirebaseData("regimenInfo", snapshot.val()));
                });
        } else {
            const authenticate = getState().authenticate;

            if (authenticate && authenticate.user) {
                const uid = authenticate.user.uid;
                ref
                    .child("regimenInfo")
                    .child(uid)
                    .off();
            }
        }

        return dispatch({
            type: SET_AUTHENTICATE_STATE,
            state
        });
    };
};

export const setRegimenInfo = data => {
    return {
        type: SET_REGIMEN_INFO,
        firebase: {
            data,
            path: "regimenInfo"
        }
    };
};

export const syncFirebaseData = (path, data) => {
    return {
        type: SYNC_FIREBASE_DATA,
        path,
        data
    };
};
