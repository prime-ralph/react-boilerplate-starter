import { createSelector } from 'reselect';

/**
 * Direct selector to the loginModal state domain
 */
// const selectLoginModalDomain = () => (state) => { console.log(state.get('loginModal')); state.get('loginModal'); };
const selectLoginModalDomain = () => (state) => state.get('loginModal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginModal
 */

const makeSelectLoginModal = () => createSelector(
  selectLoginModalDomain(),
  (substate) => substate.login.toJS()
);

export default makeSelectLoginModal;
export {
  selectLoginModalDomain,
};
