const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

router.use('/404', (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    next(new NotFoundError('Cтраница не найдена'));
  }
});

router.use('/', (req, res) => {
  res.redirect('/404'); // перенаправляет на 404 стр
});

module.exports = router;
