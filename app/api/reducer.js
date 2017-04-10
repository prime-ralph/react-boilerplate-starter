/*
 *
 * MapView reducer
 *
 */

import { Record } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from './constants';

const AuthRecord = Record({
  isFetching: false,
  isAuthenticated: false,
  user: {},
  token: null,
});
const initialAuthState = new AuthRecord();

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isAuthenticated', action.isAuthenticated).set('isFetching', action.isFetching);
    case LOGIN_SUCCESS:
      return state.set('isAuthenticated', action.isAuthenticated).set('isFetching', action.isFetching);
    case LOGIN_FAILURE:
      return state;
    case LOGOUT_REQUEST:
      return state;
    default:
      return state;
  }
}

export default authReducer;
