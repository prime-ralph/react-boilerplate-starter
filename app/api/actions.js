/*
 *
 * MapView actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from './constants';

export function loginRequest(credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: false,
    isAuthenticated: false,
  };
}
