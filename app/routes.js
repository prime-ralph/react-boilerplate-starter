// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { combineForms, createForms } from 'react-redux-form/immutable';
import { fromJS } from 'immutable';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'mainView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MainView/reducer'),
          import('containers/MainView/sagas'),
          import('containers/MainView'),
          import('containers/Map/reducer'),
          import('containers/Map/sagas'),
          import('containers/LoginModal/reducer'),
          import('containers/LoginModal/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component, mapReducer, mapSagas, loginReducer, loginSagas]) => {
          injectReducer('mainView', reducer.default);
          injectReducer('map', mapReducer.default);
          injectReducer('loginModal', fromJS(combineForms({ login: loginReducer.default }, 'loginModal')));
          injectSagas(sagas.default);
          injectSagas(mapSagas.default);
          injectSagas(loginSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
