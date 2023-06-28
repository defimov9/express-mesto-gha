const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post(
  '/cards',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/).required(),
    }).unknown(true),
  }),
  createCard,
);

router.delete(
  '/cards/:cardId',
  auth,
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  auth,
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  auth,
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  dislikeCard,
);

module.exports = router;
