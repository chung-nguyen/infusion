import * as types from './action-types';

export const syncFirebaseData = (path, subpaths, data) => {
    return {
        type: types.SYNC_FIREBASE_DATA,
        path,
        subpaths,
        data
    };
};

export const fetchFirebaseData = (path, subpaths) => {
    return {
        type: types.FETCH_FIREBASE_DATA,
        path,
        subpaths
    };
};

export const setFirebaseData = (path, data, onFinish, onError) => {
    return ({
        type: types.SET_FIREBASE_DATA,
        path,
        data,
        onFinish,
        onError
    })
};