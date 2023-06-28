const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnAuthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

module.exports = { auth };
