
const transactionService = require('../services/api/transaction');


const handleGetTransactionById = async (req, res) => {
    const { params, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const transaction = await transactionService.getTransactionById({ params, accountId, userId });
        res.status(201).json(transaction);

    } catch (error) {
        console.log(`Error in handleGetTransactionById: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleGetAllTransactions = async (req, res) => {
    const { account: { id: accountId }, user: { id: userId } } = req;
    try {

        const transactions = await transactionService.getAllTransactions({ accountId, userId });
        res.status(201).json(transactions);

    } catch (error) {
        console.log(`Error in handleGetAllTransactions: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}

const hanldeTransactionCreation = async (req, res) => {
    const { body, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const transaction = await transactionService.createTransaction({ accountId, userId, body });
        res.status(201).json(transaction);

    } catch (error) {
        console.log(`Error in hanldeTransactionCreation: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleTransactionUpdation = async (req, res) => {
    const { body, account: { id: accountId }, params: { transactionId} } = req;
    try {

        const transaction = await transactionService.updateTransaction({ body, accountId, transactionId });
        res.status(201).json(transaction);

    } catch (error) {
        console.log(`Error in handleTransactionUpdation: ${error} for account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleTransactionDeletion = async (req, res) => {
    const { account: { id: accountId }, params } = req;
    try {

        const transaction = await transactionService.deleteTransaction({ accountId, params });
        res.status(201).json(transaction);

    } catch (error) {
        console.log(`Error in handleTransactionDeletion: ${error} for account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleGetTransactionById,
    handleGetAllTransactions,
    hanldeTransactionCreation,
    handleTransactionUpdation,
    handleTransactionDeletion
}