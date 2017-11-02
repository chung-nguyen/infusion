import firebase from "react-native-firebase";
import moment from "moment";

export const NOTHING = "NOTHING";
export const SET_APP_STATE = "SET_APP_STATE";
export const FETCH_FIREBASE_DATA = "FETCH_FIREBASE_DATA";
export const SYNC_FIREBASE_DATA = "SYNC_FIREBASE_DATA";

export const SET_AUTHENTICATE_STATE = "SET_AUTHENTICATE_STATE";
export const SET_REGIMEN_INFO = "SET_REGIMEN_INFO";
export const SET_SIDE_EFFECT_DATA = "SET_SIDE_EFFECT_DATA";

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
        const ref = firebase.database().ref();

        if (state && state.user) {
            // Watch for firebase sync event
            const uid = state.user.uid;
            ref
                .child("regimenInfo")
                .child(uid)
                .on("value", snapshot => {
                    dispatch(syncFirebaseData("regimenInfo", null, snapshot.val()));
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

export const fetchFirebaseData = (path, subpaths) => {
    return (dispatch, getState) => {
        const authenticate = getState().authenticate;

        if (authenticate && authenticate.user) {
            const uid = authenticate.user.uid;

            var ref = firebase
                .database()
                .ref(path)
                .child(uid);
            for (var i = 0; i < subpaths.length; ++i) {
                ref = ref.child(subpaths[i]);
            }

            ref.once("value", snapshot => {
                dispatch(syncFirebaseData(path, subpaths, snapshot.val()));
            });
        }

        return dispatch({
            type: FETCH_FIREBASE_DATA
        });
    };
};

export const syncFirebaseData = (path, subpaths, data) => {
    return {
        type: SYNC_FIREBASE_DATA,
        path,
        subpaths,
        data
    };
};

export const setSideEffectData = (regimenID, timestamp, data) => {
    var daystamp = moment(timestamp)
        .startOf("day")
        .unix();

    return {
        type: SET_SIDE_EFFECT_DATA,
        regimenID,
        daystamp,
        timestamp,
        data,
        firebase: {
            path: "sideEffect",
            subpaths: [regimenID, daystamp.toString(), Math.flor(timestamp / 1000).toString()],
            data
        }
    };
};
