const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errors);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.listen(3000, () => console.log('App listening on port 3000'));
