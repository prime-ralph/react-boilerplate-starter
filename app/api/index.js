import feathers from 'feathers/client';
import superagent from 'superagent';
import hooks from 'feathers-hooks';
import client from 'feathers-rest/client';
import localstoragef from 'feathers-localstorage';
import localstorage from 'localstorage-memory';
import auth from 'feathers-authentication-client';

const apiRest = client(process.env.API_ENDPOINT);

const api = feathers()
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage,
    header: 'Authorization',
    path: process.env.AUTH_SERVICE,
    jwtStrategy: 'jwt',
    entity: 'token',
    // service: process.env.AUTH_USER_SERVICE,
    // cookie: 'dominion-token',
    storageKey: 'token',
  }))
  .configure(apiRest.superagent(superagent));

// const authService = auth.service(process.env.AUTH_SERVICE);
// const authUserService = auth.service(process.env.AUTH_USER_SERVICE);
// // alias for clearer reading
// authService.authenticate = authService.create;

api.authenticate({
  strategy: 'local',
  user_name: 'ralph.sto.domingo',
  password: 'ralph.sto.domingo',
})
.then((response) => {
  console.log('Authenticated!', response, api.get('token'));
  return api.passport.verifyJWT(response.token);
}).then((payload) => {
  console.log('JWT Payload', payload);
  // console.log(window.localStorage.getItem('token'));
  // payload.sub
  // return api.service(process.env.AUTH_USER_SERVICE).query();
  return '';
});

export default {
  api,
};
