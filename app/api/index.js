import feathers from 'feathers/client';
import superagent from 'superagent';
import hooks from 'feathers-hooks';
import client from 'feathers-rest/client';

const authRest = client(process.env.AUTH_ENDPOINT);
const apiRest = client(process.env.API_ENDPOINT);

const auth = feathers()
  .configure(hooks())
  .configure(authRest.superagent(superagent));
const api = feathers()
  .configure(hooks())
  .configure(apiRest.superagent(superagent));

const authService = auth.service(process.env.AUTH_SERVICE);
const authUserService = auth.service(process.env.AUTH_USER_SERVICE);
// alias for clearer reading
authService.authenticate = authService.create;

export default {
  auth,
  api,
  authService,
  authUserService,
};
