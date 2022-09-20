const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const errorRoutes = require('./routes/error');
const auth = require('./middlewares/auth');
const serverError = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors)

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(requestLogger);

app.use('/', authRoutes);
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use('/', errorRoutes);

app.use(errorLogger);

app.use(errors());
app.use(serverError);

app.listen(PORT);
