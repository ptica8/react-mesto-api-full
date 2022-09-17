const serverError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка на сервере' : err.message;
  res.status(statusCode).send({ message });
  // eslint-disable-next-line no-unreachable
  next();
};

module.exports = serverError;
