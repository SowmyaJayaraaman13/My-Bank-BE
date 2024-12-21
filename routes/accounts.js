const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadmiddleware');

const accountController = require('../controllers/accounts');

router.get('/user', accountController.handleGetUserAccount);
router.get('/accounts', accountController.handleGetAllAccounts);
router.post('/public/signup', accountController.handleSignup);
router.post('/public/login', accountController.handleLogin);
router.post('/user/profileUrl', upload.single('file'), accountController.handleSetUserProfileUrl);



module.exports = router