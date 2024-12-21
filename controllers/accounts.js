
const accountService = require('../services/api/account');


const handleGetUserAccount = async (req, res) => {
    const { account, user } = req;
    try {

        const userAccountData = { user, account };
        res.status(201).json(userAccountData);

    } catch (error) {
        console.log(`Error in handleGetUserAccount: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleGetAllAccounts = async (req, res) => {
    try {

        const accounts = await accountService.getAllAccounts();
        res.status(201).json(accounts);

    } catch (error) {
        console.log(`Error in handleGetAllAccounts: ${error}`);
        res.status(400).json({ error: error.message });
    }
}

const handleSignup = async (req, res) => {
    const { body } = req;
    try {

        const data = await accountService.signup({ body });
        res.status(201).json(data);

    } catch (error) {
        console.log(`Error in handleSignup: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleLogin = async (req, res) => {
    const { body } = req;
    try {

        const data = await accountService.login({ body });
        res.status(201).json(data);

    } catch (error) {
        console.log(`Error in handleLogin: ${error}`);
        res.status(400).json({ error: error.message });
    }
}

const handleSetUserProfileUrl = async (req, res) => {
    const { file, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const data = await accountService.setUserProfileUrl({ accountId, userId, profileFile: file });
        res.status(201).json(data);

    } catch (error) {
        console.log(`Error in handleSetUserProfileUrl: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    handleGetUserAccount,
    handleGetAllAccounts,
    handleSignup,
    handleLogin,
    handleSetUserProfileUrl,
}