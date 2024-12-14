const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accounts');

router.get('/user', accountController.handleGetUserAccount);
router.get('/accounts', accountController.handleGetAllAccounts);
router.post('/public/signup', accountController.handleSignup);
router.post('/public/login', accountController.handleLogin);
router.post('/user/profileUrl', accountController.handleSetUserProfileUrl);



module.exports = router