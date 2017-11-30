import * as firebase from 'firebase';
import * as types from './action-types';

export const verifyAuthenticateState = ({user}) => {
    return ({
        type: types.VERIFY_AUTHENTICATE_STATE,
        user
    })
};