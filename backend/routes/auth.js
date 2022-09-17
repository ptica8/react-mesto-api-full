const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const avatarPattern = require('../avatarPattern');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().default('Жак-Ив Кусто').min(2).max(30)
      .allow('', null)
      .empty(['', null]),
    about: Joi.string().default('Исследователь').min(2).max(30)
      .allow('', null)
      .empty(['', null]),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').pattern(avatarPattern).messages({ 'string.pattern.base': 'Некорректный URL' })
      .allow('', null)
      .empty(['', null]),
  }),
}), createUser);

module.exports = router;
