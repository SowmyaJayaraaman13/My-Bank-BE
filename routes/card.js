
const express = require('express');
const router = express.Router();

const cardController = require('../controllers/accounts');

router.get('/card/:cardId', cardController.handleGetCardById);
router.get('/cards', cardController.handleGetAllCards);
router.post('/card', cardController.hanldeCardCreation);
router.put('/card/:cardId', cardController.handleCardUpdation);
router.delete('/card/:cardId', cardController.handleCardDeletion);

module.exports = router