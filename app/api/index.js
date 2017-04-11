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
  .configure(apiRest.superagent(superagent))
  .configure(auth({
    storage: window.localStorage,
    header: 'Authorization',
    path: process.env.AUTH_SERVICE,
    jwtStrategy: 'jwt',
    entity: 'token',
    // service: process.env.AUTH_USER_SERVICE,
    // cookie: 'dominion-token',
    storageKey: 'token',
  }));

api.service('authenticate').hooks({
  after: {
    create(hook) {
      console.log(hook.result);
      Object.assign(hook.result, { accessToken: `Bearer ${hook.result.token}` });
      // const result = Object.assign
      // delete hook.result.token;
      return Promise.resolve(hook);
    },
  },
});

// api.authenticate({
//   strategy: 'jwt',
//   user_name: 'ralph.sto.domingo',
//   password: 'ralph.sto.domingo',
// })
// .then((response) => {
//   console.log('Authenticated!', response, api.get('accessToken'));
//   return api.passport.verifyJWT(response.token);
// }).then((payload) => {
//   console.log('JWT Payload', payload);
//   // console.log(window.localStorage.getItem('token'));
//   // payload.sub
//   return api.service(process.env.AUTH_USER_SERVICE).find();
//   // return '';
// });

export default {
  api,
};
