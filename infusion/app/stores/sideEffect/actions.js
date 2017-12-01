import * as types from './action-types';
import moment from 'moment';

export const setSideEffectData = (regimenID, timestamp, data) => {
    var daystamp = moment(timestamp)
        .startOf("day")
        .unix();

    return {
        type: types.SET_SIDE_EFFECT_DATA,
        regimenID,
        daystamp,
        timestamp,
        data,
        firebase: {
            path: "sideEffect",
            subpaths: [regimenID, daystamp.toString(), Math.floor(timestamp / 1000).toString()],
            data
        }
    };
};