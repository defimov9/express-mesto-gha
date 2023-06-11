const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6485e227518bd577e97ca6d0',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(3000, () => console.log('App listening on port 3000'));
