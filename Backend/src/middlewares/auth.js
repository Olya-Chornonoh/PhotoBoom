const {Forbidden, BadRequest, Unauthorized} = require('http-errors');
const AuthService = require('../services/auth');
const auth = new AuthService();

function authenticate(req, _res, next) {
  // first of all - check authorization header
  const authHeader = req.get('authorization');

  if (!authHeader) {
    // return forbidden error
    next(new Forbidden('Authorization header is not present'));
    return;
  }

  // split auth header to type and token
  const [type, token] = authHeader.split(' ');

  // currently only 'Bearer' type is supported
  if (type.toLowerCase() !== 'bearer') {
    // return invalid request type
    next(new BadRequest('Invalid authorization type\nSupported: \'Bearer\''));
    return;
  }

  // lastly, check token
  try {
    const encoded = auth.verify(token);

    // attach authenticated userId to request for other handlers to use
    req['userId'] = encoded.user_id;

    // invoke next handler
    next();
  } catch (err) {
    next(new Unauthorized(err.message));
  }
}

module.exports = authenticate;
