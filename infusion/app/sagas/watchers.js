import { takeLatest, takeEvery, take, call } from 'redux-saga/effects';

import * as authenticate_types from '../stores/authenticate/action-types';
import * as common_types from '../stores/action-types';

import * as authenticate_sagas from './authenticate.js';
import * as common_sagas from './common.js';

export const watchVerifyAuthenticateState = function* () {
    yield takeLatest(authenticate_types.VERIFY_AUTHENTICATE_STATE, authenticate_sagas.verifyAuthenticateState);
};

export const watchFetchFirebaseData = function* () {
    yield takeEvery(common_types.FETCH_FIREBASE_DATA, common_sagas.fetchFirebaseData);
};

export const watchSetFirebaseData = function* () {
    yield takeEvery(common_types.SET_FIREBASE_DATA, common_sagas.setFirebaseData);
}