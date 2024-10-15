const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accounts');

router.get('/account/:accountId', accountController.handleGetAccountById);
router.get('/accounts', accountController.handleGetAllAccounts);
router.post('/public/signup', accountController.handleSignup);
router.post('/public/login', accountController.handleLogin);



module.exports = router