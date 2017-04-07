/**
 * Saga for the api authenticator.
 */

import { take, call, put, select } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST
} from './constants';
import * as authService from './index';

function getAuthToken() {
  return JSON.parse(localStorage.getItem('authToken'));
}

function setAuthToken(token) {
  localStorage.setItem('authToken', JSON.stringify(token));
}

// Individual exports for testing
export function* authorize(){
     const action = yield take(LOGIN_REQUEST);
     console.log('saga triggered!');
    //  const response = yield call(authService.authenticate, action.credentials);
    //  console.log(response);
}

export function* authenticationSaga() {
    //check if token exists...
    const storedToken = yield call(getAuthToken);

    while (true) {
        if(storedToken==null){
            // if there's no token in local storage, wait for a successful login... or 
            // you can interpret it as do nothing until a login has been detected.
            yield take(LOGIN_SUCCESS);

            
        }
    }
}

// All sagas to be loaded
export default [
  authorize,
];
