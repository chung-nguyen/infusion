import * as common_types from '../action-types';

export const syncFirebaseData = (path, subpaths, data) => {
    return {
        type: common_types.SYNC_FIREBASE_DATA,
        path,
        subpaths,
        data
    };
};
