/*
 *
 * MapView reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from './constants';

// const initialApiState = fromJS({});
const initialAuthState = fromJS({
    isFetching: false,
    isAuthenticated: false,
    user: {},
    token: null
});

// function apiReducer(state = initialState, action) {
//   switch (action.type) {
//     // case LOGIN_REQUEST:
//     //   return state;
//     default:
//       return state;
//   }
// }

function authReducer(state = initialState, action) {
  switch (action.type) {
    // case LOGIN_REQUEST:
    //   return state;
    default:
      return state;
  }
}

export default authReducer;
