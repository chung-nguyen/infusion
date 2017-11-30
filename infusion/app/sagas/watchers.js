import { takeLatest, takeEvery, take, call } from 'redux-saga/effects';

import * as authenticate_types from '../stores/authenticate/action-types';

import * as authenticate_sagas from './authenticate.js';

export const watchVerifyAuthenticateState = function* () {
    yield takeLatest(authenticate_types.VERIFY_AUTHENTICATE_STATE, authenticate_sagas.verifyAuthenticateState);
};