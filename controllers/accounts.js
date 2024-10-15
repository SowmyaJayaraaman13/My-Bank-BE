
const accountService = require('../services/api/account');


const handleGetAccountById = async (req, res) => {
    const { params } = req;
    try {

        const account = await accountService.getAccountById({ params });
        res.status(201).json(account);

    } catch (error) {
        console.log(`Error in handleGetAccountById: ${error}`);
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


module.exports = {
    handleGetAccountById,
    handleGetAllAccounts,
    handleSignup,
    handleLogin,
}