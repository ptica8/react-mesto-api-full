const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const avatarPattern = require('../avatarPattern');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: (v) => avatarPattern.test(v),
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Введены некорректные данные'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Введены некорректные данные'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
