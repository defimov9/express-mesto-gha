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
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(/^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im).required(),
    }).unknown(true),
  }),
  auth,
  createCard,
);

router.delete(
  '/cards/:cardId',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  auth,
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  auth,
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  auth,
  dislikeCard,
);

module.exports = router;
