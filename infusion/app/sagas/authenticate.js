import {all, put, select} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';
import * as selectors from '../stores/selectors';
import * as firebase from 'firebase';

import * as authenticate_types from '../stores/authenticate/action-types';
import * as common_types from '../stores/action-types';

export const verifyAuthenticateState = function* (state) {
    try {
        const ref = firebase.database().ref();
        if (state && state.user) {
            const uid = state.user.uid;
            ref
                .child("regimenInfo")
                .child(uid)
                .on("value", snapshot => {

                });
        } else {
            const authenticate = yield select(selectors.getAuthenticateState);

            if (authenticate && authenticate.user) {
                const uid = authenticate.user.id;
                ref
                    .child("regimenInfo")
                    .child(uid)
                    .off();
            }
        }

        yield put({type: authenticate_types.SET_AUTHENTICATE_STATE, state});
    } catch (error) {
        console.log(error)
    }
};

function* onUserSnapshot(snapshot) {
    yield put({
        type: common_types.SYNC_FIREBASE_DATA,
        path: "regimenInfo",
        subpaths: null,
        data: snapshot.val()
    })
}