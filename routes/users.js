const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getMe,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getMe);

router.get(
  '/users/:userId',
  auth,
  celebrate({ params: Joi.object().keys({ userId: Joi.string().length(24).hex() }) }),
  getUser,
);

router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);

router.patch(
  '/users/me/avatar',
  auth,
  celebrate(
    {
      body: Joi.object().keys({ avatar: Joi.string().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/).required() }),
    },
  ),
  updateAvatar,
);

module.exports = router;
