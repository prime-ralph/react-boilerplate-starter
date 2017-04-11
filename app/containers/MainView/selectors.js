import { createSelector } from 'reselect';

/**
 * Direct selector to the mainView state domain
 */
const selectMainViewDomain = () => (state) => state.get('mainView');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MainView
 */

const makeSelectMainView = () => createSelector(
  selectMainViewDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMainView;
export {
  selectMainViewDomain,
};
