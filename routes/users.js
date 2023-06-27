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

router.get(
  '/users/:userId',
  celebrate({ params: Joi.object().keys({ userId: Joi.string().length(24).hex() }) }),
  auth,
  getUser,
);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  auth,
  updateUser,
);

router.get('/users/me', auth, getMe);

router.patch(
  '/users/me/avatar',
  celebrate(
    {
      body: Joi.object().keys({ avatar: Joi.string().pattern(/^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im) }),
    },
  ),
  auth,
  updateAvatar,
);

module.exports = router;
