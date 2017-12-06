import {fork} from "redux-saga/effects";
import * as watchers from "./watchers";

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
const startForeman = function* () {
    yield fork(watchers.watchVerifyAuthenticateState);
    yield fork(watchers.watchFetchFirebaseData);
    yield fork(watchers.watchSetFirebaseData);
};

export default startForeman;