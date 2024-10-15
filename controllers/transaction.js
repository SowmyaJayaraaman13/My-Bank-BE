
const cardService = require('../services/api/card');


const handleGetTransactionById = async (req, res) => {
    const { params } = req;
    try {

        const card = await cardService.getTransactionById({ params });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleGetTransactionById: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleGetAllTransactions = async (req, res) => {
    try {

        const cards = await cardService.getAllTransactions();
        res.status(201).json(cards);

    } catch (error) {
        console.log(`Error in handleGetAllTransactions: ${error}`);
        res.status(400).json({ error: error.message });
    }
}

const hanldeTransactionCreation = async (req, res) => {
    const { body } = req;
    try {

        const card = await cardService.createTransaction({ body });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in hanldeTransactionCreation: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleTransactionUpdation = async (req, res) => {
    const { body } = req;
    try {

        const card = await cardService.updateTransaction({ body });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleTransactionUpdation: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleTransactionDeletion = async (req, res) => {
    try {

        const card = await cardService.deleteTransaction();
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleTransactionDeletion: ${error}`);
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