const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const errors = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im),
    }),
  }),
  createUser,
);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errors);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.listen(3000, () => console.log('App listening on port 3000'));
