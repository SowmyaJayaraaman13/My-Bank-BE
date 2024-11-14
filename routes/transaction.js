const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction');

router.get('/transaction/:transactionId', transactionController.handleGetTransactionById);
router.get('/transactions', transactionController.handleGetAllTransactions);
router.post('/transaction', transactionController.hanldeTransactionCreation);
router.put('/transaction/:transactionId', transactionController.handleTransactionUpdation);
router.delete('/transaction/:transactionId', transactionController.handleTransactionDeletion);

module.exports = router