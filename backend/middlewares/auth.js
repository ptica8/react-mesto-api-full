const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;
console.log('process.env:', process.env)

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI5ODQ0ZjFkNGVjZmNmMjI1ZTc2YTUiLCJpYXQiOjE2NjQzMTAxNjAsImV4cCI6MTY2NDkxNDk2MH0.4EZFu_3rzotHw2jw4FPsSznkbST_HiZXw9Ed89m2UyY'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'my-secret-key'; // вставьте сюда секретный ключ для разработки из кода
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются');
} else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err);
}
}
