
import { fromJS } from 'immutable';
import loginModalReducer from '../reducer';

describe('loginModalReducer', () => {
  it('returns the initial state', () => {
    expect(loginModalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
