/* eslint-disable no-useless-escape */
const router = require('express').Router();
const {
  cardJoiValidation,
  cardIdJoiValidation,
} = require('../utils/cardValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardJoiValidation, createCard);
router.delete('/:cardId', cardIdJoiValidation, deleteCard);
router.put('/:cardId/likes', cardIdJoiValidation, likeCard);
router.delete('/:cardId/likes', cardIdJoiValidation, dislikeCard);

module.exports = router;
