import {all, put, select} from 'redux-saga/effects';
import * as selectors from '../stores/selectors';
import * as firebase from 'firebase';
import * as common_types from '../stores/action-types';

export const fetchFirebaseData = function* (path, subpaths) {
    try {
        const authenticate = yield select(selectors.getAuthenticateState);

        if (authenticate && authenticate.user) {
            const uid = authenticate.user.uid;

            var ref = firebase
                .database()
                .ref(path)
                .child(uid);
            for (var i = 0; i < subpaths.length; ++i) {
                ref = ref.child(subpaths[i]);
            }

            const info = ref.once("value", snapshot => {
                return snapshot.val();
            });

            yield put({
                type: common_types.SYNC_FIREBASE_DATA,
                path: path,
                subpaths: subpaths,
                data: info
            });
        }
    } catch (error) {
        console.log(error)
    }
};