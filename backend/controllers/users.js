const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateError = require('../errors/DuplicateError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  const id = (req.params.userId === undefined ? req.user._id : req.params.userId);
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  if (!validator.isEmail(email)) {
    next(new BadRequestError('Введены некорректные данные'));
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email, password: hash, name, about, avatar,
      })

        .then((newUser) => {
          // eslint-disable-next-line no-shadow,no-underscore-dangle
          res.send({
            // eslint-disable-next-line max-len
            data: {
            // eslint-disable-next-line max-len
              email: newUser.email, name: newUser.name, about: newUser.about, avatar: newUser.avatar, _id: newUser._id,
            },
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Введены некорректные данные'));
          } else if (err.code === 11000) {
            next(new DuplicateError('Пользователь с таким Email уже зарегистрирован'));
          } else {
            next(err);
          }
        }));
  }
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: updateUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;
  User.findByIdAndUpdate(req.user._id, { avatar: newAvatar }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: updateUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'my-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
